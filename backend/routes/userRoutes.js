const { Router } = require('express');

const router = Router();

const { userList, singleUser, userEmail, register, login, editUser, deleteUser } = require('../controller/userControllers');
const Auth = require('../middleware/Auth');
const UserAuthorization = require('../middleware/UserAuthorization');


router.get("/api/users", [Auth], userList)
router.get("/api/users/:id", [Auth], singleUser)
router.get("/api/usersEmail/:email", userEmail)
router.get("/auth", [UserAuthorization], (req, res) => { })

router.post("/api/register", register)
router.post("/api/login", login)

router.put("/api/users/:id", editUser)

router.delete("/api/users/:id", [Auth], deleteUser)


module.exports = router;