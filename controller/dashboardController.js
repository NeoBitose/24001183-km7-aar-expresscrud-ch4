const { User } = require("../models");
const imagekit = require("../lib/imagekit");

// Function for get all user data
async function userPage(req, res) {
    try {
        const users = await User.findAll();
        console.log(users)
        res.render("users/index", {
            title: "User Page",
            users: users
        })
    } 
    catch (error) {
        res.render("error", {
            message: error.message
        })
    }
}

async function createPage(req, res) {
    try {
        // console.log(users)
        res.render("users/create", {
            title: "Create Page"
        })
    } 
    catch (error) {
        res.render("error", {
            message: error.message
        })
    }
}

async function insertUser(req, res) {
    const newUser = req.body;
    if (req.file) {     
        console.log(req.file)
        const file = req.file;
        const split = file.originalname.split(".");
        const ext = split[split.length - 1]
    
        // upload
        const uploadedImage = await imagekit.upload({
            file : file.buffer,
            fileName: `Profile-${Date.now()}.${ext}`
        })
    
        console.log(uploadedImage)

        try {
            await User.create({...newUser, photoProfile: uploadedImage.url});
            res.redirect("/admin/dashboard")
        } catch (error) {
            res.render("error", {
                message: error.message
            })
        }
    }
    else{
        try {
            await User.create({...newUser});
            res.redirect("/admin/dashboard")
        } catch (error) {
            res.render("error", {
                message: error.message
            })
        }
    }

}

module.exports = {
    userPage,
    createPage,
    insertUser
};
