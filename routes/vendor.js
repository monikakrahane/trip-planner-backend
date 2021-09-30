const express = require('express');
const vendorController = require('../controllers/vendor.controller');

const router = express.Router();

router.post('/sign-up-vendor', vendorController.signUpVendor);
router.post('/login-vendor', vendorController.loginVendor)

module.exports = router;