const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig/config");

const User = sequelize.define("User", {
    name : {type : DataTypes.STRING, allowNull: false},
    email : {type : DataTypes.STRING, allowNull: false, unique: true},
    phone : {type: DataTypes.NUMBER, allowNull: false, unique: true}
});

module.exports = User;