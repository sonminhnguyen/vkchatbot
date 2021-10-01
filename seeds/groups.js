
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('groups').del()
    .then(function () {
      // Inserts seed entries
      return knex('groups').insert([
        {id_group: 1, group_name: '8191-21'},
        {id_group: 2, group_name: '8191-22'},
        {id_group: 3, group_name: '8191-31'},
        {id_group: 4, group_name: '8191-51'},
        {id_group: 5, group_name: '8191-11'},
      ]);
    });
};
