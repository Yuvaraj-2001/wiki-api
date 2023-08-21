
const client = require('twilio')("ACcd8810e247e103bea01c2f9c2d7c6a2c", "09c706c639273ed51d73a5782528e83a");
const verify = require('twilio')("AC83d76954013c065abc6a0634abeb0b15", "ddde86b707d1769c67195e8a7d056f3f");


function sendMessage(req, res){
    try {
        const message = client.messages.create({
            body: req.body.message,
            from: '+17067024044',
            to: req.body.phone
        }).then(function(call){
            console.log('Message sent SID :', call);
            res.status(200).json({ message: 'Message sent successfully' });
        });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'An error occurred while sending the message' });
    }
}

function sendOtp(req, res){
    verify.verify.v2
    .services("VA0c38292371535356854a02e482b9b892")
    .verifications.create({ to: req.body.phoneNumber, channel: "sms" })
    .then((verification) => {
        res.status(200).json({ message: 'OTP Sent successfully', verification });
    })
}

function  verifyOtp(req, res){
    verify.verify.v2
    .services("VA0c38292371535356854a02e482b9b892")
    .verificationChecks.create({ to: req.body.phoneNumber, code: req.body.code })
    .then((verification) => {
        res.status(200).json({ message: 'OTP Verified successfully', verification });
    }).catch((error) => {
        res.status(400).json({ message: 'something went wronf', error });
    })
    ;
}

module.exports = {
    sendMessage,
    sendOtp,
    verifyOtp
}