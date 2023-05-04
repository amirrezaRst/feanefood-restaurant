const { Router } = require('express');
const router = Router();

const { foodList, foodHomePage, singleFood, addFood, editFood, deleteFood } = require('../controller/foodControllers');
const AdminAuth = require('../middleware/AdminAuth');
const Auth = require('../middleware/Auth');


router.get("/foods", foodList);
router.get("/foodsForHome", foodHomePage);
router.get("/foods/:id", singleFood);

router.post("/foods", [Auth, AdminAuth], addFood);

router.put("/foods/:id", [Auth, AdminAuth], editFood);

router.delete("/foods/:id", [Auth, AdminAuth], deleteFood)


module.exports = router;