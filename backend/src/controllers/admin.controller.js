const mongoose = require('mongoose');
const User = require('../models/User');
const Nursery = require('../models/Nursery');
const Plant = require('../models/Plant');
const Order = require('../models/Order');

async function users(req,res){
  try { const items=await User.find().select('-passwordHash').sort({createdAt:-1}).lean(); res.json({items}); }
  catch(e){res.status(500).json({message:e.message});}
}
async function updateUser(req,res){
  try {
    const allowed=['customer','nursery','admin'];
    if(!allowed.includes(req.body.role)) return res.status(400).json({message:'Invalid role'});
    const item=await User.findByIdAndUpdate(req.params.id,{role:req.body.role},{new:true,runValidators:true}).select('-passwordHash');
    if(!item) return res.status(404).json({message:'User not found'}); res.json(item);
  } catch(e){res.status(400).json({message:e.message});}
}
async function nurseries(req,res){
  try { const items=await Nursery.find().populate('owner','name email').sort({createdAt:-1}).lean(); res.json({items}); }
  catch(e){res.status(500).json({message:e.message});}
}
async function plants(req,res){
  try { const items=await Plant.find().populate('nurseryId','name').sort({createdAt:-1}).lean(); res.json({items}); }
  catch(e){res.status(500).json({message:e.message});}
}
async function createPlant(req,res){
  try { const item=await Plant.create(req.body); res.status(201).json(item); }
  catch(e){res.status(400).json({message:e.message});}
}
async function updatePlant(req,res){
  try { const item=await Plant.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}); if(!item)return res.status(404).json({message:'Plant not found'}); res.json(item); }
  catch(e){res.status(400).json({message:e.message});}
}
async function deletePlant(req,res){
  try { const item=await Plant.findByIdAndDelete(req.params.id); if(!item)return res.status(404).json({message:'Plant not found'}); res.json({success:true}); }
  catch(e){res.status(400).json({message:e.message});}
}
async function orders(req,res){
  try {
    const items=await Order.find().populate('userId','name email').sort({createdAt:-1}).lean();
    res.json({items:items.map(o=>({...o,customer:o.userId?.name||'Customer',email:o.userId?.email||''}))});
  } catch(e){res.status(500).json({message:e.message});}
}
async function updateOrder(req,res){
  try {
    const statuses=['PLACED','CONFIRMED','SHIPPED','DELIVERED','CANCELLED'];
    const payment=['PENDING','PAID','FAILED','REFUNDED'];
    const patch={}; if(req.body.status){if(!statuses.includes(req.body.status))return res.status(400).json({message:'Invalid status'});patch.status=req.body.status;} if(req.body.paymentStatus){if(!payment.includes(req.body.paymentStatus))return res.status(400).json({message:'Invalid payment status'});patch.paymentStatus=req.body.paymentStatus;}
    const item=await Order.findByIdAndUpdate(req.params.id,patch,{new:true}); if(!item)return res.status(404).json({message:'Order not found'}); res.json(item);
  } catch(e){res.status(400).json({message:e.message});}
}
async function reports(req,res){
  try {
    const [orders,users,nurseries,plants]=await Promise.all([Order.find().lean(),User.find().lean(),Nursery.find().lean(),Plant.find().lean()]);
    const valid=orders.filter(o=>o.status!=='CANCELLED'); const revenue=valid.reduce((s,o)=>s+o.total,0);
    const monthMap=new Map(); valid.forEach(o=>{const d=new Date(o.createdAt);const k=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;monthMap.set(k,(monthMap.get(k)||0)+o.total);});
    const categoryMap=new Map(); plants.forEach(p=>categoryMap.set(p.category,(categoryMap.get(p.category)||0)+1));
    res.json({revenue,orders:valid.length,users:users.length,nurseries:nurseries.length,plants:plants.length,customers:users.filter(u=>u.role==='customer').length,monthly:Array.from(monthMap.entries()).sort().slice(-12).map(([month,value])=>({month,value})),categories:Array.from(categoryMap.entries()).map(([category,value])=>({category,value}))});
  } catch(e){res.status(500).json({message:e.message});}
}
async function activities(req,res){
  try { const [u,n,o,p]=await Promise.all([User.find().sort({createdAt:-1}).limit(5).lean(),Nursery.find().sort({createdAt:-1}).limit(5).lean(),Order.find().sort({createdAt:-1}).limit(5).lean(),Plant.find().sort({createdAt:-1}).limit(5).lean()]); res.json({items:[...u.map(x=>({type:'USER',text:`${x.name} registered`,date:x.createdAt})),...n.map(x=>({type:'NURSERY',text:`${x.name} registered`,date:x.createdAt})),...o.map(x=>({type:'ORDER',text:`Order #${String(x._id).slice(-6)} placed`,date:x.createdAt})),...p.map(x=>({type:'PLANT',text:`${x.name} added to marketplace`,date:x.createdAt}))].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,12)}); }
  catch(e){res.status(500).json({message:e.message});}
}
module.exports={users,updateUser,nurseries,plants,createPlant,updatePlant,deletePlant,orders,updateOrder,reports,activities};
