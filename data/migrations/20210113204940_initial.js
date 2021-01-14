
exports.up = async (knex) => {
    await knex.schema.createTable("users", (table => {
      table.increments("id")
      table.string("username").notNull().unique()
      table.string("password").notNull()
    }))

    await knex.schema.createTable("message", (table => {
        table.boolean("status")
        table.string("title")
        table.string("message", 10000)
    }))
};

exports.down = async (knex) => {
    await knex.schema.dropTableIfExists("message")
    await knex.schema.dropTableIfExists("users")
};