const Sequelize = require('sequelize');
const connection = require('./database');

const Question = connection.define('question', {
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
