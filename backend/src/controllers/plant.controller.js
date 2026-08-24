const Plant=require('../models/Plant');
const Nursery=require('../models/Nursery');

function escapeRegex(value){return value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
const categoryAliases={
  'Indoor Plants':'Indoor','Outdoor Plants':'Outdoor','Flowering Plants':'Flowering',
  'Succulents':'Succulent','Medicinal Plants':'Medicinal','Fruit Plants':'Fruit',
  'Herb Plants':'Herb','Bonsai Plants':'Bonsai','Gift Plants':'Gift','Office Plants':'Office'
};

async function list(req,res){
  try{
    const search=String(req.query.search||'').trim();
    const category=String(req.query.category||'All').trim();
    const filter={};
    if(category&&category!=='All'){
      const canonical=categoryAliases[category]||category;
      filter.category=new RegExp(`^${escapeRegex(canonical)}$`,'i');
    }
    if(search){
      const regex=new RegExp(escapeRegex(search),'i');
      filter.$or=[{name:regex},{category:regex},{description:regex},{light:regex},{water:regex},{difficulty:regex}];
    }
    if(req.query.mine === 'true'){
      if(!req.user || !['nursery','admin'].includes(req.user.role)) return res.status(403).json({message:'Nursery/admin access required'});
      if(req.user.role === 'nursery'){
        const nursery=await Nursery.findOne({owner:req.user.id}).select('_id').lean();
        filter.nurseryId=nursery?._id || null;
      } else if(req.query.nurseryId) {
        filter.nurseryId=req.query.nurseryId;
      }
    }
    const items=await Plant.find(filter).sort({featured:-1,createdAt:-1}).lean();
    res.json({items,total:items.length});
  }catch(error){res.status(500).json({message:'Unable to load plants',detail:error.message});}
}

async function mine(req,res){
  req.query.mine='true';
  return list(req,res);
}

function validImage(image){
  if(!image) return true;
  if(typeof image !== 'string') return false;
  if(!image.startsWith('data:image/')) return false;
  // Keep Mongo documents safely below the 16MB limit.
  return image.length <= 4_000_000;
}

async function create(req,res){
  try{
    if(req.user.role === 'nursery'){
      const nursery=await Nursery.findOne({owner:req.user.id}).select('_id').lean();
      if(!nursery) return res.status(400).json({message:'Nursery profile not found. Complete nursery registration first.'});

      const {name,category='Indoor',price=0,image='',description='',light='',water='',difficulty='',featured=false}=req.body;
      if(!name || !String(name).trim()) return res.status(400).json({message:'Plant name is required.'});
      if(!validImage(image)) return res.status(400).json({message:'Invalid plant photo. Use an image up to approximately 3 MB.'});

      const plant=await Plant.create({
        name:String(name).trim(),category,price:Number(price)||0,image,description,light,water,difficulty,
        featured:Boolean(featured),nurseryId:nursery._id
      });
      return res.status(201).json(plant);
    }

    const plant=await Plant.create({...req.body,nurseryId:req.body.nurseryId||null});
    res.status(201).json(plant);
  }catch(error){res.status(400).json({message:error.message});}
}

module.exports={list,mine,create};
