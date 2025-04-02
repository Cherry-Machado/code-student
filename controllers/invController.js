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

/* Build the main vehicle management view */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav();
  const classificationSelect = await utilities.buildClassificationList();
  res.render("./inventory/management", {
    title: "Vehicle Management",
    errors: null,
    nav,
    classificationSelect,
  });
};

/**********************************
 * Building the add classification view
 **********************************/
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav();

  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  });
};

/**********************************
 * Controller function to add a vehicle
 * classification through a POST request.
 **********************************/
invCont.addClassification = async function (req, res, next) {
  const { classification_name } = req.body;

  const response = await invModel.addClassification(classification_name);
  let nav = await utilities.getNav();
  if (response) {
    req.flash(
      "notice",
      `The "${classification_name}" classification was successfully added.`
    );
    res.render("inventory/management", {
      title: "Vehicle Management",
      errors: null,
      nav,
      classification_name,
    });
  } else {
    req.flash("notice", `Failed to add ${classification_name}`);
    res.render("inventory/add-classification", {
      title: "Add New Classification",
      errors: null,
      nav,
      classification_name,
    });
  }
};

 /* Build the add inventory view */
 invCont.buildAddInventory = async function (req, res, next) {
  const nav = await utilities.getNav();
  let classifications = await utilities.buildClassificationList();

  res.render("inventory/addInventory", {
    title: "Add Vehicle",
    errors: null,
    nav,
    classifications,
  });
};


module.exports = invCont;
