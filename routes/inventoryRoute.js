// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");
const Validate = require("../utilities/inventory-validation");

//router.use(["/add-classification", "/add-inventory"], utilities.checkLogin);

// Route to build Managementinventory Inventory
router.get("/", utilities.handleErrors(invController.buildManagementView));

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);

// Classification management routes
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassification)
);
router.post(
  "/add-classification",
  Validate.classificationRules(),
  Validate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);

// Inventory management routes
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventory)
);
router.post(
  "/add-inventory",
  Validate.inventoryRules(),
  Validate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
);

router.get(
  "/getInventory/:classification_id",
  utilities.checkAccountType,
  utilities.handleErrors(invController.getInventoryJSON)
);

// Delete vehicle information routes
router.get(
  "/delete/:inventoryId",
  utilities.handleErrors(invController.buildDeleteInventory)
);
router.post("/delete/", utilities.handleErrors(invController.deleteInventory)); // Don't need validation

// Build edit/update inventory views
router.get(
  "/edit/:inventoryId",
  utilities.handleErrors(invController.buildEditInventory)
);
router.post("/update/", utilities.handleErrors(invController.updateInventory));

module.exports = router;
