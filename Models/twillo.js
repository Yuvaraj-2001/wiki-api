
const accountSid = 'ACcd8810e247e103bea01c2f9c2d7c6a2c';
const authToken = 'ccd2287c7ed9d228fc9a9bc824a98c02';
const client = require('twilio')(accountSid, authToken);
const verify = require('twilio')("AC83d76954013c065abc6a0634abeb0b15", "e034f9bf8f4c139c89458a9f015a5bcd");


function sendMessage(req, res){
    console.log(req.body);
    try {
        client.messages
        .create({
            body: req.body.message,
            from: '+17067024044',
            to: req.body.phone
        }).then(function(){
            console.log('Message sent successfully');
            res.status(200).json({ message: 'Message sent successfully' });
        }).catch ((error) => {
            console.error('Error sending message:', error);
            res.status(500).json({ error: 'An error occurred while sending the message' });
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