const { requireAuth, requireRole } = require('../middleware/auth.middleware');

function requireAdmin(req,res,next){
  return requireAuth(req,res,()=>requireRole('admin')(req,res,next));
}

function requireSuperAdmin(req,res,next){
  return requireAuth(req,res,()=>{
    if(req.user?.role !== 'admin' || req.user?.isSuperAdmin !== true){
      return res.status(403).json({message:'PlantUno owner access required.'});
    }
    next();
  });
}

module.exports={requireAdmin,requireSuperAdmin};
