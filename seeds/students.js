
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id_student: 1, id_vk: 674765662, group: 1},
      ]);
    });
};
