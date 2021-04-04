const bc = require("bcryptjs")
require('dotenv').config()


const pass = process.env.PASSWORD

exports.seed = async function(knex) {
 
  const hashedpass = bc.hashSync(pass, 12)

  await knex("admin").insert([
    {username: "Admin1", password: hashedpass},
    {username: "Admin2", password: hashedpass}
  ])
  
};
