import express from 'express';
const router = express.Router();
import nodemailer from 'nodemailer';

router.get('/get-image/:image', (req,res) => {
    res.download(`./images/${req.params.image}`);
})

router.post('/contact-us', (req,res)=>{

    const {name, senderEmail, message} = req.body;

    const transport = nodemailer.createTransport({

        service: "gmail",
        auth: {
            user: "emailrouter11@gmail.com",
            pass: "qdmzswlgbienfaex"
        }
        
        
    });
    
    const mailOptions = {
        from: name,
        to: "tkchimanaz@gmail.com",
        subject: 'Email from customer',
        html: `<h1>Message From Visitors</h1>
                <h2>Email Of Visitor</h2>
                <p>${senderEmail}</p>
                <h3>Message</h3>
                <p>${message}</p>`
    };
      
    transport.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(500).json({
            message: "Something went wrong"
          })
        } else {
          res.json({
            message: "Message sent"
          })
        }
      });
})

export default router