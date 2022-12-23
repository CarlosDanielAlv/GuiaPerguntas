const { Sequelize } = require('sequelize');

const connection = new Sequelize("questions_guide",'root','admin',{
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = connection;