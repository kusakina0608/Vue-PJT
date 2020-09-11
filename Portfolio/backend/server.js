const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = 8000;

const { sequelize } = require("./models");
app.use(morgan("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

sequelize.sync({ force: false })
.then(() => console.log("db 접속 성공"))
.catch((err) => console.log(err));

app.get("/api/user", async (req, res) => {
});

app.post("/api/user", async (req, res) => {
});

app.post("/api/login", async (req, res) => {
});

app.get("/api/post", async (req, res) => {
});

app.post("/api/post", async (req, res) => {
});

app.listen(PORT, () => console.log(`this server listening on ${PORT}`));