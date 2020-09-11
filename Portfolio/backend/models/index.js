const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new this.Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

db.sequelize = sequelize;

module.exports = db;
