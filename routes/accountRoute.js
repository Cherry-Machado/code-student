/* *************************************
 *   Account Routes
 ************************************* */
// Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const util = require("../utilities");

// Route to build Login View
router.get("/login", util.handleErrors(accountController.buildLogin));

// Route to build registration view
router.get("/register", util.handleErrors(accountController.buildRegister));

// Process Management view
router.get(
  "/",
  util.checkLogin,
  util.handleErrors(accountController.buildManagement)
);

router.get(
  "/update-account/:accountId",
  util.checkLogin,
  util.handleErrors(accountController.buildAccountUpdate)
);

router.get("/logout", util.handleErrors(accountController.buildLogoutView));

module.exports = router;
