const jwt = require("jsonwebtoken")

function restrict() {
    return async (req, res, next) => {
        const authError = {
            message: "Error: path is restricted please sign in."
        } 
        
        try {
            const token = req.cookies.token
            

            if (!token) {
                return res.status(401).json(authError)
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decoddedPayload) => {
                if (err){
                    return res.status(401).json(authError)
                }
                req.token = decoddedPayload

                next()
            })

        }catch(err){
            next(err)
        }
    }
}

module.exports = restrict