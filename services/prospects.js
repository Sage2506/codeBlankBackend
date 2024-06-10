const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function get(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT
    attachment_name,
    attachment,
    ext_number,
    id,
    last_name,
    middle_name,
    name,
    neighborhood,
    phone_number,
    rfc,
    status,
    street,
    zip_code
    FROM prospects LIMIT ${offset},${config.listPerPage}`
  );
  const count = await db.query(`SELECT Count(*) as total FROM prospects;`);
  const data = helper.emptyOrRows(rows);

  for (const prospect of data) {
    const foreignRows = await db.query(
      `SELECT id, name FROM files WHERE prospect_id =${prospect.id};`
    )
    const files = helper.emptyOrRows(foreignRows);
    if(foreignRows.length > 0) {
      prospect['files']= files;
    }
  }
  const meta = {
    currentPage: parseInt(page),
    count : count[0].total,
    pages: Math.ceil(count[0].total / config.listPerPage)
  };

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
  message = 'Error in creating prospect';

  if (result.affectedRows) {
    return {data : {...prospect, id: result.insertId}}
  }

  return {message};
}

async function update(id, prospect){
  const result = await db.query(
    `UPDATE prospects SET status=${prospect.status} WHERE id=${id}`
  );
  let message = 'Error in updating prospect';

  if (result.affectedRows) {
    return {data: prospect}
  }

  return {message};
}

module.exports = {
  get,
  create,
  update
}