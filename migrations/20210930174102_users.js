exports.up = async (knex) => {
    await knex.schema.createTable('users', function(table) {
      table.increments('id_user');
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.string('profile').notNullable();
      table.boolean('admin').notNullable().defaultTo(false);
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    });
  };
  
exports.down = async (knex) => {
    await knex.schema.dropTable('users');
};