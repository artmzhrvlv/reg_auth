const {Sequelize} = require('sequelize')




module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.send.DB_HOST,
        port: process.send.DB_PORT
    }
)