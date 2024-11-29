const { json } = require("sequelize");
const { User, Company } = require ("../models/userCompanies.js");

exports.createCompany = async(req, res) => {
    try {
        const { name, city } = req.body;

        if (!name || !city) {
            return res.status(400), json({ message : "name and city field are required"});
        }

        const company = await Company.create({name, city});
        if (company) {
            return res.status(201), json({ message: "Company created successfully", data: company });
        }
    } catch (error) {
        return res.status(500), json({ message: "Error while creating company", error: error.message})
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Company.destroy({ where: {
            id: id
        } })
        if(response) {
            return res.status(200), json({ message: "Company deleted successfully"});
        } res.status(404).json({error: "Not found"});
    } catch (error) {
        return res.status(500).json({ message: "Error while deleting a company", error: error.message})
    }
};

exports.getUserByCompanyId = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findByPk(id, {
            include: {model: User, through: {attributes: []}}
        })
        if(company) {
            return res.status(200), json(company.Users);
        } 
        res.status(404).json({error: "Not found"});
    } catch (error) {
        return res.status(500).json({ message: "Error while deleting a company", error: error.message})
    }
};

