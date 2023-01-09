var express = require("express");
const {store, login, index, update, destroy, show} = require("../controllers/languageController");
var router = express.Router();

router.post("/register", store);
router.post("/login", login);
router.get("/", index);
router.put("/:id", update);
router.delete("/:id", destroy);
router.get('/:id', show);

module.exports = router;