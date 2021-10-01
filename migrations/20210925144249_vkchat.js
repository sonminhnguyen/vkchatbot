
exports.up = async (knex) => {
  await knex.schema.createTable('groups', function(table) {
    table.increments('id_group');
    table.string('group_name').unique();
  })
  await knex.schema.createTable('students', function(table) {
    table.increments('id_student');
    table.double('id_vk').unique();
    table.integer('group').unsigned().notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.foreign('group').references('id_group').inTable('groups');
  })
  
};

exports.down = async (knex) => {
  await knex.schema.dropTable('students');
  await knex.schema.dropTable('groups');
};
