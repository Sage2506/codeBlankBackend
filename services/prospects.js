const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function get(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name,
    middle_name,
    last_name,
    street,
    ext_number,
    neighborhood,
    zip_code,
    phone_number,
    rfc
    FROM prospects LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function create(prospect){
  const result = await db.query(
    `INSERT INTO prospects
    (name, middle_name, last_name, street, ext_number, neighborhood, zip_code, phone_number, rfc)
    VALUES
    (
    "${prospect.name.toLowerCase()}",
    "${prospect.middle_name.toLowerCase()}",
    "${prospect.last_name.toLowerCase()}",
    "${prospect.street.toLowerCase()}",
    "${prospect.ext_number.toLowerCase()}",
    "${prospect.neighborhood.toLowerCase()}",
    "${prospect.zip_code.toLowerCase()}",
    "${prospect.phone_number.toLowerCase()}",
    "${prospect.rfc.toLowerCase()}"
    );`
  );

  let message = 'Error in creating prospect';

  if (result.affectedRows) {
    message = 'Prospect created successfully';
  }

  return {message};
}

async function update(id, prospect){
  const result = await db.query(
    `UPDATE prospects SET
    name="${prospect.name.toLowerCase()}",
    middle_name="${prospect.middle_name.toLowerCase()}",
    last_name="${prospect.last_name.toLowerCase()}",
    street="${prospect.street.toLowerCase()}",
    ext_number="${prospect.ext_number.toLowerCase()}",
    neighborhood="${prospect.neighborhood.toLowerCase()}",
    zip_code="${prospect.zip_code.toLowerCase()}",
    phone_number="${prospect.phone_number.toLowerCase()}",
    rfc="${prospect.rfc.toLowerCase()}"
    WHERE id=${id}`
  );

  let message = 'Error in updating prospect';

  if (result.affectedRows) {
    message = 'prospect updated successfully';
  }

  return {message};
}

module.exports = {
  get,
  create,
  update
}