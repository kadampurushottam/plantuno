const Nursery=require('../models/Nursery');

function distanceKm(lat1, lon1, lat2, lon2) {
  const toRad = value => value * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(lat2-lat1);
  const dLon = toRad(lon2-lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

async function list(req,res){
  try{
    const {latitude,longitude,radiusKm=10,locality,city} = req.query;
    const lat=Number(latitude), lon=Number(longitude), radius=Number(radiusKm);

    if(Number.isFinite(lat) && Number.isFinite(lon)) {
      const maxDistance = Math.min(Math.max(Number.isFinite(radius) ? radius : 10, 1), 100) * 1000;
      const nurseries = await Nursery.find({
        location: {
          $near: {
            $geometry: { type:'Point', coordinates:[lon,lat] },
            $maxDistance: maxDistance
          }
        }
      }).limit(50).lean();

      return res.json(nurseries.map(n => ({
        ...n,
        distanceKm:Number(distanceKm(lat,lon,n.latitude,n.longitude).toFixed(1))
      })));
    }

    const filter={};
    if(locality) filter.locality = new RegExp(String(locality).trim().replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i');
    if(city) filter.city = new RegExp(String(city).trim().replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i');
    return res.json(await Nursery.find(filter).sort({rating:-1}).limit(50).lean());
  }catch(error){res.status(500).json({message:error.message});}
}

async function create(req,res){
  try{
    const {name,address,locality,city,district,state,pincode,latitude,longitude,phone,openNow=true}=req.body;
    const lat=Number(latitude), lon=Number(longitude);
    if(!name || !Number.isFinite(lat) || !Number.isFinite(lon)) return res.status(400).json({message:'Name, latitude and longitude are required'});
    const location={type:'Point',coordinates:[lon,lat]};
    const nursery=await Nursery.create({owner:req.user.id,name,address,locality,city,district,state,pincode,latitude:lat,longitude:lon,location,phone,openNow});
    res.status(201).json(nursery);
  }catch(error){res.status(400).json({message:error.message});}
}

async function mine(req,res){
  try{
    const nursery=await Nursery.findOne({owner:req.user.id}).lean();
    if(!nursery) return res.status(404).json({message:'Nursery profile not found'});
    res.json(nursery);
  }catch(error){res.status(500).json({message:error.message});}
}

module.exports={list,create,mine};
