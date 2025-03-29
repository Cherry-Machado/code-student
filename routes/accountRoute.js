/* *************************************
 *   Account Routes
 ************************************* */
// Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities");

// Route to build Login View
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route to build registration view
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
);

// Process Management view
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildManagement)
);

router.get(
  "/update-account/:accountId",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildAccountUpdate)
);

router.get(
  "/logout",
  utilities.handleErrors(accountController.buildLogoutView)
);

module.exports = router;
