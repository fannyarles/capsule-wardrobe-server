const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const { isAuthenticated } = require("../middlewares/jwt.middleware");

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).catch(err => res.status(500).json({ message: `Internal Service Error.` }));
    if ( !user ) { return res.status(400).json({ message: `User not found.` }); } 

    const checkPassword = bcrypt.compareSync(password, user.password);
    console.log(password, user.password)
    if ( !checkPassword ) { return res.status(401).json({ message: `Unable to authenticate user.`}); }
    
    const payload = { id: user._id, username: user.username };
    const authToken = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: '6h'
        }
    )

    res.status(200).json({ authToken });
    
});

router.post('/signup', (req, res, next) => {
    const { username, email, password } = req.body;

    if ( username === '' || email === '' || password === '' ) {
        res.status(400).json({ message: `All fields are required.` });
        return;
    }

    // Use regex to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Provide a valid email address.' });
        return;
    }

    // Use regex to validate the password format
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
        return;
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    return User.create({ email, username, password: hashPassword })
    .then(response => res.status(201).json({ message: `User created.`}))
    .catch(err => res.status(500).json({ message: `Internal Server Error.` }));

});

router.get('/verify', isAuthenticated, (req, res, next) => res.status(200).json( req.payload ));

module.exports = router;