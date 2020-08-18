exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("boards")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("boards").insert([
        { name: "lit", title: "Literature" },
        { name: "ck", title: "Food & Cooking" },
        { name: "fa", title: "Fashion" },
      ]);
    });
};
