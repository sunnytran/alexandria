require("dotenv").config();

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: process.env.USER_USER,
          password: process.env.USER_PASS,
          role: "user",
        },
        {
          username: process.env.MOD_USER,
          password: process.env.MOD_PASS,
          role: "mod",
        },
      ]);
    });
};
