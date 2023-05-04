const { Router } = require('express');
const router = Router();

const { userList, singleUser, addUser, deleteUser, editUser, changePassword } = require('../controller/adminControllers');
const { foodList, singleFood, addFood, editFood, deleteFood } = require('../controller/foodControllers');
const { contactList, addContact, deleteContact } = require('../controller/contactControllers');

const Auth = require('../middleware/Auth');
const AdminAuth = require('../middleware/AdminAuth');


//! Admin User Routes
router.get("/users", [Auth, AdminAuth], userList);
router.get("/singleUser/:id", [Auth, AdminAuth], singleUser);

router.post("/addUser", [Auth, AdminAuth], addUser);
router.post("/changePassword/:id", [Auth, AdminAuth], changePassword);

router.put("/editUser/:id", [Auth, AdminAuth], editUser);

router.delete("/deleteUser/:id", [Auth, AdminAuth], deleteUser);



//! Admin Food Routes
router.get("/foods", [Auth, AdminAuth], foodList);
router.get("/singleFood/:id", [Auth, AdminAuth], singleFood);

router.post("/foods", [Auth, AdminAuth], addFood);

router.put("/foods/:id", [Auth, AdminAuth], editFood);

router.delete("/foods/:id", [Auth, AdminAuth], deleteFood);



//! Admin Contact Routes
router.get("/contacts", [Auth, AdminAuth], contactList);

router.post("/addContact", [Auth, AdminAuth], addContact);

router.delete("/deleteContact/:id", [Auth, AdminAuth], deleteContact)




module.exports = router;