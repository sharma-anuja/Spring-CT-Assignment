const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig/config");

const Company = sequelize.define("Company", {
    name : {type : DataTypes.STRING, allowNull: false},
    city : {type : DataTypes.STRING, allowNull: false}
});

module.exports = Company;