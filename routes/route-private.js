const router = require('express').Router();
const { authenticateToken } = require('../validation/verify-token')

// Creating One
router.get('/', authenticateToken, async (req, res) => {
   //res.send(req.user)
   res.json({message: 'random data that you cannot access unless using tokens'});

});


module.exports = router;
