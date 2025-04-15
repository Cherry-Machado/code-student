const utilities = require("../utilities/");
const baseController = {};

baseController.buildHome = async function (req, res) {
  const nav = await utilities.getNav();
  res.render("index", { title: "Home", nav });
};

async function buildAccountManagementView(req, res) {
  let nav = await utilities.getNav();
  const unread = await messageModel.getMessageCountById(res.locals.accountData.account_id);

  res.render("account/account-management", {
    title: "Account Management",
    nav,
    errors: null,
    unread, 
  });
  return; 
}

module.exports = baseController;
