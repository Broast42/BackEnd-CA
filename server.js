const express = require('express');
const cors = require('cors');
const authRouter = require("./api/auth/auth-router")

const server = express();

server.use(express.json());
server.use(cors({origin: true, credentials: true }));

server.get("/", (req, res) =>{
    res.json({message: "carpet-advantage api is running"})
});

server.use('/auth', authRouter)



//default error
server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong",
        error: err
    });
});

module.exports = server