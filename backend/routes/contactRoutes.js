const { Router } = require('express');
const router = Router();

const { contactList, addContact, deleteContact } = require('../controller/contactControllers');
const Auth = require('../middleware/Auth');


router.get("/contactList",[Auth], contactList);

router.post("/addContact", addContact);

router.delete("/deleteContact/:id", [Auth], deleteContact)


module.exports = router;