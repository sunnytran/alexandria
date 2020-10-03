var adjectives = require("./adjectives");
var animals = require("./animals");
var seedrandom = require("seedrandom");

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const generateName = (ip, id) => {
  seedrandom(ip + "/" + id, { global: true });

  var name =
    capitalize(adjectives[Math.floor(Math.random() * adjectives.length)]) +
    capitalize(adjectives[Math.floor(Math.random() * adjectives.length)]) +
    capitalize(animals[Math.floor(Math.random() * animals.length)]);

  return name;
};

module.exports = {
  capitalize: capitalize,
  generateName: generateName,
};
