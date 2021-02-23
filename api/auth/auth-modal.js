const db = require("../../data/config")
const bc = require("bcryptjs")

function findAdmin(name){
    return db("admin").where("username", name)
}

function getAllAdmins(){
    return db("admin").select("id", "username")
}

async function addAdmin(user){
    user.password = await bc.hashSync(user.password, 12)
    await db("admin").insert(user)

    newUser = {
        username: user.username,
    }

    return newUser;
}

async function editAdmin(id, changes){
    await db("admin").where("id", id).update(changes)

    return changes;
}

function deleteAdmin(id){
    return db('admin').where("id", id).del()
}

module.exports = {
    findAdmin,
    getAllAdmins,
    addAdmin,
    editAdmin,
    deleteAdmin
}