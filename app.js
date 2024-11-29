const express = require("express");
const sequelize = require("./dbConfig/config");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
require("dotenv").config();

const app = express();
const port = process.env.DB_PORT;
app.use(express.json());

app.use("/api/company", companyRoutes);
app.use("/api/user", userRoutes)

sequelize
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started at ${port}`)
        });
    })
    .catch((error) => console.log("Database sync failed", error));