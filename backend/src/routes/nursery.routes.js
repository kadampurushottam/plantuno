const router=require('express').Router();
const controller=require('../controllers/nursery.controller');
const {requireAuth,requireRole}=require('../middleware/auth.middleware');

router.get('/',controller.list);
router.get('/mine',requireAuth,requireRole('nursery'),controller.mine);
router.post('/',requireAuth,requireRole('nursery'),controller.create);

module.exports=router;
