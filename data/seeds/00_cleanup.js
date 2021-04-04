
exports.seed = async function(knex) {
  await knex.schema.raw('TRUNCATE TABLE "admin", "message", "videos", "serv_cat", "serv_service", "b_and_a", "a_pic" ')
  
};
