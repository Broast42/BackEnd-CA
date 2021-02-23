const bc = require("bcryptjs")
const router = require('express').Router()
const db = require("./auth-modal")
const jwt = require("jsonwebtoken")

router.post("/add", async(req, res, next) => {
    try{
        const username = await db.findAdmin(req.body.username).first()

        if(username){
            return res.status(409).json({Error: "Username already exists"})
        }

        const newUser = await db.addAdmin(req.body)

        res.status(201).json(newUser)

    }catch(err){
        next(err)
    }
})

router.post("/login", async(req, res, next) => {
    const nomatch = {
        error: "Credentials do not match"
    }

    try{
        const user = await db.findAdmin(req.body.username).first()

        if(!user){
            return res.status(401).json(nomatch)
        }

        const validPass = await bc.compareSync(req.body.password. user.password)

        if(!validPass){
            return res.status(401).json(nomatch)
        }

        const payload = {
            subject: user.id,
            username: user.username
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET)
        
        //uncomment when ready for server side auth and add restrict middleware to restricted routes. 
        //res.cookie("token", token)

        res.json({
            id: user.id,
            username: user.username
        })

    }catch(err){
        next(err)
    }
})

router.put("/edit/:id", async (req, res, next) => {
    try{
        if(req.body.username){
            const username = await db.findAdmin(req.body.username).first()
            if(username){
                return res.status(409).json({error: "Username is taken"})
            }
            if(req.body.password){
                req.body.password = await bc.hashSync(req.body.password, 12)
            }
            await db.editAdmin(req.params.id, req.body)
            res.status(202).json({message: "User has been updated"})
        }
    }catch(err){
        next(err)
    } 
})

router.delete("/delete/:id", async (req, res, next) => {
    try{
        await db.deleteAdmin(req.params.id)
        res.status(200).json({message: 'User has been deleted'})
    }catch(err){
        next(err)
    }
})

module.exports = router