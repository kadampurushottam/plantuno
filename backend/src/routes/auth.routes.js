const router=require('express').Router();
const publicRegistrationRoleGuard = (req, res, next) => {
  const role = req.body?.role;
  if (role && !['customer', 'nursery'].includes(role)) {
    return res.status(403).json({
      message: 'Public registration is allowed only for customer or nursery accounts.'
    });
  }
  next();
};

const controller=require('../controllers/auth.controller');

router.post('/register',publicRegistrationRoleGuard, controller.register);
router.post('/login',controller.login);

module.exports=router;
