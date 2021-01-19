const router = require('express').Router();
const UserModel = require('../models/user.model');
//Route To Render Manage Users Page
router.get('/', (req, res) => {
    return res.render('manageUsers/index');
});

//Route To Get All Users
router.get('/getAllUsers', async (req, res) => {
    try {
        let users = await UserModel.find();
        return res.send(users);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
})

//Route To Create New User
router.post('/create', async (req, res) => {
    try {
        await new UserModel(req.body).save();
        return res.sendStatus(201);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});


//Route To Get User Details
router.get('/edit/:userId', async (req, res) => {
    try {
        let user = await UserModel.findOne({ _id: req.params.userId });

        return res.send(user);
    } catch (err) {
        return res.sendStatus(500);
    }
});

//Route to update user details
router.post('/edit', async (req, res) => {
    try {
        await UserModel.findOneAndUpdate({ _id: req.body._id }, { $set: req.body });
        console.log(req.body)
        return res.sendStatus(201)
    } catch (err) {
        console.log(err.message);
        return res.sendStatus(500)
    }
})

//Route To Delete User
router.delete('/delete/:userId', async (req, res) => {
    try {
        await UserModel.findOneAndRemove({ _id: req.params.userId });
        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
})
module.exports = router;