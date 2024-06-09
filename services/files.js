
const db = require('./db');

async function create(name, prospect_id){
  if (!name || !prospect_id) {
     return res.status(400).send({ message: 'Please upload a file.' });
  }
  const message = 'Error in creating file';
  const result = await db.query(
   `INSERT INTO files (name, prospect_id) VALUES ( "${name}","${prospect_id}");`
  )

   if(result.affectedRows){
      return {data : {name, id: result.insertId, prospect_id}}
   }

   return {message}

}

module.exports = {
  create
}