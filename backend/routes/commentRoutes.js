const { Router } = require('express');
const router = Router();

const { addComment, editComment, deleteComment } = require('../controller/commentControllers');


router.post("/addComment/:id", addComment);

router.put("/updateComment/:foodId/:commentId", editComment);

router.delete("/deleteComment/:foodId/:commentId", deleteComment)


module.exports = router;