const router = require('express').Router();
const User = require('../models/user');
const { registerValidation, loginValidation } = require('../validation/user-validation')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// Creating One
router.post('/register', async (req, res) => {


    // Validate the data before saving 
    const { error } = registerValidation(req.body);
    if (error) { return res.status(400).json(error.details) }


    // Check if the user is already in the database 
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) {
        return res.status(400).json({message: 'Email Already Exist'});
    }

    // Hash the password - npm install bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    // Create new user
    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword
        });
        const SavedUser = await user.save();
        return res.status(201).json({user: SavedUser.id});
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

});


router.post('/login', async (req, res) => {

    try {
        // Validate the data before saving 
        const { error } = loginValidation(req.body);
        if (error) { return res.status(401).json(error.details) }


        // Check if the email exist in the database 
        const user = await User.findOne({email: req.body.email});
        if (!user) { return res.status(401).json({message: 'Email is not found '}); }

        // Check if password is not correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) { return res.status(401).json({ message: 'Invalid Password'}); }

        // Create and assign token - npm install jsonwebtoken
        const token = jwt.sign({_id : user._id}, process.env.TOKEN_SECRET);

        
        res.header('auth-token', token).status(200).send(token);

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
});



module.exports = router;