
exports.up = async (knex) => {
    await knex.schema.createTable("admin", (table => {
        table.increments("id")
        table.string("username").notNull().unique()
        table.string("password").notNull()
    }))

    await knex.schema.createTable("message", (table => {
        table.increments("id")
        table.boolean("status")
        table.string("title")
        table.string("message", 10000)
    }))

    await knex.schema.createTable("videos", (table => {
        table.increments("id")
        table.string("name")
        table.string("url")
    }))

    await knex.schema.createTable("serv_cat", (table => {
        table.increments("id")
        table.string("category")
    }))

    await knex.schema.createTable("serv_service", (table => {
        table.increments("id")
        table.string("service")
        table.integer("cat_id").references("id").inTable("serv_cat")
    }))

    
};

exports.down = async (knex) => {
    await knex.schema.dropTableIfExists("serv_service")
    await knex.schema.dropTableIfExists("serv_cat")
    await knex.schema.dropTableIfExists("videos")
    await knex.schema.dropTableIfExists("message")
    await knex.schema.dropTableIfExists("users")
};
