const express = require("express");
const router = express.Router();
const {Admin} = require("../models");
const {hashPassword, comparedPassword} = require("../utils/bcrypt");

// "[POST] /admin/ : Register"
router.post("/", async(req, res) => {
    try {
        console.log(req.body);
        const {email, password, name} = req.body;
        if(email && password && name){
            const hashedpassword = await hashPassword(password);
            console.log(hashedpassword);
            const data = await Admin.create({
                email: email,
                password: hashedpassword,
                name: name
            })
            console.log(data);
            return res.json({signup: true});
        }else{
            throw new Error("Sign up Error");
        }
    } catch (error) {
        return res.json({signup: false});
    }
})

// "[POST] /admin/login : Login"
router.post("/login", async(req, res) =>{
    try {
        console.log(req.body);
        const {email, password} = req.body;
        const adminData = await Admin.findOne({
            where: {
                email: email
            }
        });
        console.log(adminData);
        const hashedpassword = adminData.dataValues.password;
        const compareResult = await comparedPassword(password, hashedpassword);
        console.log("로그인 결과: ");
        console.log(compareResult)
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
        console.log(error);
        return res.json({login: false});
    }
})

module.exports = router;