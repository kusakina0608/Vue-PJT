const express = require("express");
const app = express();
const morgan = require("morgan");
const {sequelize} = require("./models");
const cors = require("cors");
const PORT = 8000;
const indexRouter = require("./routes");
const adminRouter = require("./routes/admin");
const portfolioRouter = require("./routes/portfolio");

app.use(
    cors({
        // origin: "http://220.87.38.37:8080",
        origin: "http://localhost:8080",
        credentials: true
    })
)

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());

sequelize.sync({ force: false })
.then(() => console.log("db 접속 성공"))
.catch((err) => console.log(err));


app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/portfolio", portfolioRouter);

app.listen(PORT, () => console.log(`this server listening on ${PORT}`));