const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  /*console.log(data);*/
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/**********************************
 * Vehicle Management Controllers
 **********************************/

/**
 * Build the main vehicle management view */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav();
  const classificationSelect = await utilities.buildClassificationList();
  res.render("inventory/management", {
    title: "Vehicle Management",
    errors: null,
    nav,
    classificationSelect,
  });
};

module.exports = invCont;
