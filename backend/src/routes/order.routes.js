const router = require('express').Router();
const controller = require('../controllers/order.controller');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

router.use(requireAuth);
router.post('/', controller.create);
router.get('/mine', controller.mine);
router.get('/mine/stats', requireRole('customer'), controller.customerStats);
router.get('/nursery/stats', requireRole('nursery'), controller.nurseryStats);
router.get('/admin/stats', requireRole('admin'), controller.adminStats);

module.exports = router;
