const express = require("express");
const { upload } = require("../utils/multer");
const { Room, Option, Image, sequelize } = require("../models");
const Sequelize = require("sequelize");
const fs = require("fs").promises;
const router = express.Router();
const Op = Sequelize.Op;

router.get("/", async(req, res) => {
    try {
        console.log(req.query);
        const data = await Room.findAll({
            include: [{model: Option}, {model: Image}],
            where: {
                address: {
                    [Op.like] :`%${req.query.searchKeyword}%`
                }
            }
        });
        console.log(data);
        return res.json({room:data});
    } catch (error) {
        console.log(error);
        return res.json({room:false});
    }
})

router.get("/images", async(req, res) => {
    try {
        console.log(req.query.src);
        const file = await fs.readFile(req.query.src);
        return res.send(file);
    } catch (error) {
        return res.json({upload: false})
    }
})

router.post("/", upload.array("files"), async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        // Room에 대한 정보들 title, content, address, longitude, latitude, seller_id
        // Image의 경로 및 이미지들(multer 처리)
        // Option들
        // throw new Error();
        const {title, content, address, longitude, latitude, seller_id, options} = req.body;
        console.log(req.body);
        console.log(req.files);
        const room = await Room.create(
            {
                title: title,
                content: content,
                address: address,
                latitude: latitude,
                longitude: longitude,
                seller_id: seller_id
            },
            {
                transaction: transaction
            }
        );
        // throw new Error();
        if(options){
            if(typeof options === "string"){
                await Option.create(
                    {
                        item: options,
                        room_id: room.dataValues.id
                    },
                    {
                        transaction: transaction
                    }
                )
            }else{
                await  Promise.all(options.map(async (li) => {
                    await Option.create(
                        {
                            item: li,
                            room_id: room.dataValues.id
                        },
                        {
                            transaction: transaction
                        }
                    )
                }))
            }
        }
        if(req.files){
            await Promise.all(
                req.files.map(async (li) => {
                    await Image.create(
                        {
                            src: li.path,
                            room_id: room.dataValues.id
                        },
                        {
                            transaction: transaction
                        }
                    )
                })
            )
        }
        console.log(room);
        await transaction.commit();
        return res.json({ upload: true });
    } catch (error) {
        console.log(error);
        transaction.rollback();
        // console.log(req.files);
        if(req.files){
            req.files.forEach(li => {
                console.log(li.path);
                fs.unlink(li.path, err => {
                    if(err){
                        console.log(err);
                    }
                })
            })
        }
        return res.json({ upload: false });
    }
});

router.get("/:id", async(req, res) => {
    try {
        const data = await Room.findOne({
            include: [{model: Option}, {model: Image}],
            where: {
                id: req.params.id
            }
        });
        
        return res.json({ room: data });
    } catch (error) {
        console.log(error);
        return res.json({ room: false })
    }
})

// 업데이트는 option 따로, room 따로, images 따로 업데이트를 해준다.
router.put("/:id/option", async(req, res) =>{
    const transaction = await sequelize.transaction();
    try {
        const del = await Option.destroy(
            {
                where: {
                    room_id: req.params.id
                }
            },
            {
                transaction: transaction
            }
        );
        console.log("del: ", del);
        const {options} = req.body;
        console.log("바디: ", req.body);
        console.log("아이디: ", req.params.id);
        console.log("options: ", options);
        if(options){
            if(typeof options === "string"){
                await Option.create(
                    {
                        item: options,
                        room_id: req.params.id
                    },
                    {
                        transaction: transaction
                    }
                )
            }else{
                await  Promise.all(options.map(async (li) => {
                    await Option.create(
                        {
                            item: li,
                            room_id: req.params.id
                        },
                        {
                            transaction: transaction
                        }
                    )
                }))
            }
        }
        await transaction.commit();
        return res.json({update: true});
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        return res.json({update: false});
    }
})

module.exports = router;