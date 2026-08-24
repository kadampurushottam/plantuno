const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/User');
const Nursery=require('../models/Nursery');

const PUBLIC_REGISTRATION_ROLES = new Set(['customer','nursery']);

function sign(user){
  return jwt.sign({
    id:user._id.toString(),
    role:user.role,
    isSuperAdmin:user.isSuperAdmin === true
  },process.env.JWT_SECRET,{expiresIn:'7d'});
}

function safeUser(user){
  return {
    id:user._id.toString(),
    name:user.name,
    email:user.email,
    role:user.role,
    isSuperAdmin:user.isSuperAdmin === true,
    isActive:user.isActive !== false,
    location:user.location || {}
  };
}

function cleanLocation(input = {}) {
  return {
    address:String(input.address || '').trim(),
    locality:String(input.locality || '').trim(),
    city:String(input.city || '').trim(),
    district:String(input.district || '').trim(),
    state:String(input.state || '').trim(),
    pincode:String(input.pincode || '').trim(),
    latitude: input.latitude === null || input.latitude === undefined || input.latitude === '' ? null : Number(input.latitude),
    longitude: input.longitude === null || input.longitude === undefined || input.longitude === '' ? null : Number(input.longitude)
  };
}

function validCoordinates(location) {
  return Number.isFinite(location.latitude) && Number.isFinite(location.longitude) &&
    location.latitude >= -90 && location.latitude <= 90 &&
    location.longitude >= -180 && location.longitude <= 180;
}

async function register(req,res){
  try{
    const {name,email,password,role='customer'}=req.body;
    if(!name || !email || !password) return res.status(400).json({message:'Name, email and password are required'});
    if(!PUBLIC_REGISTRATION_ROLES.has(role)) return res.status(403).json({message:'Public registration is allowed only for customer or nursery accounts.'});

    const location = cleanLocation(req.body.location);
    if(role === 'nursery' && !validCoordinates(location)) {
      return res.status(400).json({message:'Nursery registration requires a valid latitude and longitude.'});
    }

    const normalizedEmail=String(email).toLowerCase().trim();
    const exists=await User.findOne({email:normalizedEmail});
    if(exists) return res.status(409).json({message:'Email already registered'});

    const passwordHash=await bcrypt.hash(password,12);
    const user=await User.create({name:String(name).trim(),email:normalizedEmail,passwordHash,role,location,isActive:true,isSuperAdmin:false});

    if(role === 'nursery') {
      await Nursery.create({
        owner:user._id,
        name:String(req.body.nurseryName || name).trim(),
        address:location.address,
        locality:location.locality,
        city:location.city,
        district:location.district,
        state:location.state,
        pincode:location.pincode,
        latitude:location.latitude,
        longitude:location.longitude,
        location:{type:'Point',coordinates:[location.longitude,location.latitude]},
        phone:String(req.body.phone || '').trim(),
        openNow:true
      });
    }

    return res.status(201).json({token:sign(user),user:safeUser(user)});
  }catch(error){
    return res.status(500).json({message:error.message});
  }
}

async function login(req,res){
  try{
    const {email,password}=req.body;
    const user=await User.findOne({email:String(email || '').toLowerCase().trim()});
    if(!user) return res.status(401).json({message:'Invalid email or password'});
    if(user.isActive === false) return res.status(403).json({message:'This account is disabled. Contact PlantUno support.'});
    const valid=await bcrypt.compare(password,user.passwordHash);
    if(!valid) return res.status(401).json({message:'Invalid email or password'});
    return res.json({token:sign(user),user:safeUser(user)});
  }catch(error){return res.status(500).json({message:error.message});}
}

module.exports={register,login};
