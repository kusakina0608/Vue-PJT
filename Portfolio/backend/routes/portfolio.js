const express = require("express");
const { upload } = require("../utils/multer");
const { Portfolio, sequelize } = require("../models");
const Sequelize = require("sequelize");
const fs = require("fs").promises;
const router = express.Router();
const Op = Sequelize.Op;

// "[POST] /portfolio/ : Add new Portfolio"
router.get("/", async (req, res) => {
    try {
        const data = await Portfolio.findAll();
        let new_data = data.map((li) => {
            return {
                title: li.title,
                contents: li.content,
                src: li.image,
                githubURL: li.repository
            }
        });
        return res.json({portfolio: new_data});
    } catch (error) {
        return res.json({room:false});
    }
})

router.get("/images", async(req, res) => {
    try {
        const file = await fs.readFile(req.query.src);
        return res.send(file);
    } catch (error) {
        return res.json({upload: false})
    }
})

// "[POST] /portfolio/ : Add new Portfolio"
router.post("/", upload.array("image"), async(req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const {title, content, repository} = req.body;
        const port = await Portfolio.create(
            {
                title: title,
                content: content,
                repository: repository,
                image: req.files[0].path
            }
        )
        await transaction.commit();
        return res.json({portfolio: true});
    } catch (error) {
        return res.json({portfolio: false});
    }
})

// "[POST] /admin/login : Login"
router.post("/login", async(req, res) =>{
    try {
        const {email, password} = req.body;
        const adminData = await Admin.findOne({
            where: {
                email: email
            }
        });
        const hashedpassword = adminData.dataValues.password;
        const compareResult = await comparedPassword(password, hashedpassword);
        if(compareResult){
            return res.json({
                login: true,
                id: adminData.dataValues.id,
                name: adminData.dataValues.name,
            });
        }else{
            throw new Error();
        }
    } catch (error) {
        return res.json({login: false});
    }
})

module.exports = router;