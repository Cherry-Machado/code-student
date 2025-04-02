const utilities = require("../utilities");
const invModel = require("../models/inventory-model");
const { body, validationResult } = require("express-validator");
const validate = {};

/* **********************************
 *  Rules to validate the add
 *  classification Data.
 * ********************************* */
validate.classificationRules = () => {
  return [
    // classification_name is required and nedd to be an string.
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .isAlphanumeric()
      .isLength({ min: 1 })
      .withMessage("Please provide a valid classification name."),
  ];
};

/* ******************************
 * Thisfunctions is to check data
 * and return errors and if all is
 * well, then continue to registration.
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      // Have to do it again.
      errors,
      title: "Add Classification",
      nav,
      classification_name,
    });
    return;
  }
  next();
};

module.exports = validate;
