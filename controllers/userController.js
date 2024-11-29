const { json } = require("sequelize");
const { User, Company } = require ("../models/userCompanies.js");

exports.createUser = async(req, res) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ error: "name, email and phone fields are required"});
        }
        const user = await User.create({ name, email, phone });
        res.status(200), json({ message: "User created successfully"});
    } catch (error) {
        res.status(500), json ({ error: error.message });
    }
};

exports.listUsers = async(req, res) => {
    try {
        const users = await User.findAll({
            include: {model: Company, through: {attributes: []}}
        });
        const formattedData = users.map((user) => ({
            name: user.name,
            email: user.email,
            phone: user.phone,
            companies: user.Companies.map((company) => company.name).join(",")
        }));
        res.status(200), json(formattedData);
    } catch (error) {
        res.status(500), json ({ error: error.message });
    }
};

exports.userCompanyAllocation = async(req, res) => {
    try {
        const { userId, companyIds } = req.body;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found"});
        }

        const companies = await Company.findAll({where: {id: companyIds }});
        if(companies.length !== companyIds.length) {
            return res.status(404).json({ error: "Not all companies are found"});
        }
        await user.setCompanies(companies);
        res.status(200).json({ message: "Allocation successful"})
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
}