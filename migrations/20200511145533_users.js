
exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments("id").primary();
    table.string("userName");
    table.string("userEmail");
    table.string("firstName");
    table.string("lastName");
    table.string("phoneNumber");
    table.integer("role_id").unsigned();
});
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
