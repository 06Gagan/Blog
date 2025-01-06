const { Router } = require('express');
const User = require('../models/user');
const router = Router();

router.get('/signin', (req, res) => {
    res.render('signin', { errorMessage: null });
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie('Token', token).redirect('/');
    } catch (error) {
        console.error('Signin error:', error.message);
        return res.render('signin', { errorMessage: 'Invalid email or password.' });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('Token').redirect('/');
});

router.get('/signup', (req, res) => {
    res.render('signup', { errorMessage: null });
});

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const user = new User({ fullName, email, password });
        await user.save();
        res.redirect('/');
    } catch (error) {
        const errorMessage =
            error.code === 11000
                ? 'Email already exists. Please try another one.'
                : 'Error creating account. Please try again.';
        res.render('signup', { errorMessage });
    }
});

module.exports = router;
