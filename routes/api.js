const express = require("express");
const router = express.Router();
const validate = require("../validate/validate");
const magazineController = require("../controller/magazineControllers");
const consultController = require("../controller/consultingControllers");
const equipmentController = require("../controller/equipmentControllers");
const upload = require("../middlewares/upload");
const verifyToken = require("../middlewares/verifyToken");

// create magazine api
router.post("/magazines",verifyToken,validate.validateMagazine(),magazineController.postMagazines);
// delete magazine api
router.delete("/magazines/:id", 
verifyToken, 
magazineController.deleteMagazines);
// // update magazine api
router.put("/magazines/:id",verifyToken,validate.validateMagazine(),magazineController.putMagazines);
// // get detail magazine api
router.get("/magazines/:id", magazineController.getMagazines);
// // get list magazine api
router.get("/magazines", magazineController.getAllMagazines);
// //-- end magazine api----//

// create consulting api
router.post("/consultings",verifyToken,validate.validateConsult(),upload.single("image"),consultController.postConsults);
// delete consulting api
router.delete("/consultings/:id",verifyToken,consultController.deleteConsults);
// update consuslting api
router.put("/consultings/:id",verifyToken,validate.validateConsult(),upload.single("image"),consultController.putConsults);
// get detail consulting api
router.get("/consultings/:id", consultController.getConsults);
// get list consulting api
router.get("/consultings", consultController.getAllConsults);
//-- end consulting api----//

// create equipment api
router.post("/equipment",verifyToken,upload.single("image"),equipmentController.postEquipment);
// get delete consulting api
router.delete("/equipment/:id",verifyToken,equipmentController.deleteEquipment);
// get update consulting api
router.put("/equipment/:id",verifyToken,validate.validateConsult(),upload.single("image"),equipmentController.putEquipment);
// get detail consulting api
router.get("/equipment/:id", equipmentController.getEquipment);
// get list consulting api
router.get("/equipment", equipmentController.getAllEquipment);
//-- end equipment api----//

module.exports = router;
