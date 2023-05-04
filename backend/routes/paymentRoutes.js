const { Router } = require('express');
const router = Router();

const { checkoutCart, verifyPayment, userPaymentInfo } = require('../controller/userControllers');
const Auth = require('../middleware/Auth');


router.get("/checkoutCart/:address", [Auth], checkoutCart);
router.get("/verifyPayment/:authority/:status", verifyPayment)
router.get("/userPayment/:authority", userPaymentInfo)

module.exports = router;