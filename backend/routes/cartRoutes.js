const { Router } = require('express');
const router = Router();

const { addCart, editCart, deleteCart } = require('../controller/cartControllers');


router.post("/addCart/:id", addCart)

router.put("/updateCart/:userId/:foodId", editCart)

router.delete("/deleteCart/:userId/:foodId", deleteCart)


module.exports = router