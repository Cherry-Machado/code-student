// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");
const invValidate = require("../utilities/inventory-validation");

router.use(["/add-classification", "/add-inventory"], utilities.checkLogin);

// Route to build Managementinventory Inventory
router.get(
  "/",
  utilities.checkAuthorizationManager,
  utilities.handleErrors(invController.buildManagementView)
);

// Classification management routes
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassification)
);
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);

// Inventory management routes
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventory)
);
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
);
module.exports = router;

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
