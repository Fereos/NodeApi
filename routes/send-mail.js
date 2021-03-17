const express = require('express')
const router = express.Router()
const sgMail = require('@sendgrid/mail')


// Getting all 
router.get('/', async (req, res) => {
    try {

        // trial send mail - sending 

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)

        const msg = {
            to: 'trolls.perfect.guy@gmail.com', // Change to your recipient
            from: 'socials.melchor.pineda@gmail.com', // Change to your verified sender
            subject: 'Email Registration ',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }

        sgMail
            .send(msg)
            .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        });


       res.json('Hello The Email is Sent');
       
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})


module.exports = router

