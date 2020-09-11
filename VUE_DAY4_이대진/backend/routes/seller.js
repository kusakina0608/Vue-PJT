const express = require("express");
const router = express.Router();
const {Seller} = require("../models");
const {hashPassword, comparedPassword} = require("../utils/bcrypt");

// 회원가입 기능
router.post("/", async(req, res) => {
    try {
        const {email, password, name} = req.body;
        if(email && password && name){
            const hashedpassword = await hashPassword(password);
            console.log(hashedpassword);
            const data = await Seller.create({
                email: email,
                password: hashedpassword,
                name: name
            })
            console.log(data);
            return res.json({signup: true});
        }
    } catch (error) {
        return res.json({signup: false});
    }
})

router.post("/login", async(req, res) =>{
    try {
        const {email, password} = req.body;
        const userData = await Seller.findOne({
            where: {
                email: email
            }
        });
        console.log(userData);
        const hashedpassword = userData.dataValues.password;
        const compareResult = await comparedPassword(password, hashedpassword);
        console.log("로그인 결과: ");
        console.log(compareResult)
        if(compareResult){
            // auth=3: 일반 사용자 / auth=2: 판매자
            return res.json({
                login: true,
                id: userData.dataValues.id,
                name: userData.dataValues.name,
                auth: 2
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