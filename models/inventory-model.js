const pool = require("../database/index.js");

/* ***********************************
 *  Get all classificatin data
 * ********************************** */
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  );
}

/* ***************************
 * Insert classification_name
 * in the database.
 * ************************** */

async function addClassification(classification_name) {
  // ..for insertion to the database.
  const sql = `INSERT INTO public.classification (classification_name) 
    VALUES ($1)`;

  try {
    return await pool.query(sql, [classification_name]);
  } catch (error) {
    return error.message;
  }
}

/*******************************
 * Add a single inventory item
 * in the database.
 *******************************/
async function addInventory(
  inv_make,
  inv_model,
  inv_year,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_miles,
  inv_color,
  classification_id
) {
  const sql = `INSERT INTO public.inventory 
    ( inv_make,
      inv_model, 
      inv_year, 
      inv_description, 
      inv_image, 
      inv_thumbnail, 
      inv_price, 
      inv_miles, 
      inv_color, 
      classification_id)
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10 )`;
  try {
    return await pool.query(sql, [
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    ]);
  } catch (error) {
    console.error("editInventory error. " + error);
  }
}

module.exports = {
  getClassifications,
  addClassification,
  addInventory,
};
