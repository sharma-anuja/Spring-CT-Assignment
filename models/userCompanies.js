const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig/config");
const User = require("./user");
const Company = require("./company");

const UserCompanies = sequelize.define("UserCompanies", {});
User.belongsToMany(Company, {through: UserCompanies});
Company.belongsToMany(User, {through: UserCompanies});

module.exports = {sequelize, Company, User, UserCompanies};