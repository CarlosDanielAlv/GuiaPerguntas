const Sequelize = require('sequelize');
const connection = require('./database');

const Question = connection.define('questions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    },
});

Question.sync({force: false}).then(()=>{});// Se não exister cria

module.exports = Question;