const Sequelize = require('sequelize')

const sequelize = new Sequelize('tsoha', 'riku.ruokonen', process.env.DB_PASS, {
  dialect: "postgres",
  port:5432,
});



module.exports = sequelize;