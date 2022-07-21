const express = require("express");
const router = express.Router();

const validate = require("../validate/validate");


const magazineController = require("../controller/magazineControllers");
const consultingController = require("../controller/consultingControllers");
const equipmentController = require("../controller/equipmentControllers");
const upload = require('../middlewares/upload');

// create magazine api
router.post(
  "/post-magazine",
  validate.validateMagazine(),
  magazineController.createMagazine
);
// delete magazine api
router.delete("/magazine/:id", magazineController.deleteMagazine);
// // update magazine api
router.put("/magazine/:id", validate.validateMagazine(), magazineController.updateMagazine);
// // get detail magazine api
router.get("/detail-magazine/:id", magazineController.detailMagazine);
// // get list magazine api
router.get("/list-magazine", magazineController.getAllMagazine);
// //-- end magazine api----//



// create consulting api
router.post("/post-consulting",validate.validateConsult(),upload.single("image"),consultingController.createConsulting);
// delete consulting api
router.delete("/consulting/:id", consultingController.deleteConsulting);
// update consuslting api
router.put(
  "/consulting/:id",
  validate.validateConsult(),
  upload.single("image"),
  consultingController.updateConsulting
);
// get detail consulting api
router.get("/detail-consulting/:id", consultingController.detailSulting);
// get list consulting api
router.get("/list-consulting", consultingController.getAllSulting);
//-- end consulting api----//


// create equipment api
router.post(
  "/post-equipment",
  upload.single("image"),
  equipmentController.createEquipment
);
// get delete consulting api
router.delete("/equipment/:id", equipmentController.deleteEquipment);
// get update consulting api
router.put("/equipment/:id",validate.validateConsult(),upload.single("image"),equipmentController.updateEquipment);
// get detail consulting api
router.get("/detail-equipment/:id", equipmentController.detailEquipment);
// get list consulting api
router.get("/list-equipment", equipmentController.getAllEquipment);
//-- end equipment api----//

module.exports = router;
