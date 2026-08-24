const router=require('express').Router();
const controller=require('../controllers/plant.controller');
const {requireAuth,requireRole}=require('../middleware/auth.middleware');

router.get('/',controller.list);
router.get('/mine',requireAuth,requireRole('nursery','admin'),controller.mine);
router.post('/',requireAuth,requireRole('nursery','admin'),controller.create);

module.exports=router;
