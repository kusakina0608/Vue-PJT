const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const Admin = require("./admin");
const Portfolio = require("./portfolio");
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Admin = Admin;
db.Portfolio = Portfolio;

Admin.init(sequelize);
Portfolio.init(sequelize);

db.sequelize = sequelize;

module.exports = db;
