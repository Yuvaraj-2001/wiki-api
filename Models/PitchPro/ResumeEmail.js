
var nodeMail = require('nodemailer');
// yuavraj.co.services@gmail.com
// Nodemail@admin@123
//swsgtqmjeaxyenpt

var transport = nodeMail.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'yuvaraj.mail.services@gmail.com',
            pass: 'swsgtqmjeaxyenpt' // App Password
        }
    }
);

function emailApi(email, mobile, location, job, file, fileName){
    return {
      from: 'yuvaraj.mail.services@gmail.com',
      to: ['yuvayuvaraj720444@gmail.com'],
      subject: "Direct Pitch Pro Carrers",
      html: `
        <h2>Carrers Entry from</h2>
        <h4>Email: ${email}</h4>
        <h4>Mobile: ${mobile}</h4>
        <h4>Location: ${location}</h4>
        <h4>Job: ${job}</h4>
        <br>
        <br>
        <h5>if it not commig, inspect and get the below paragraph</h5>
        <h5>document.querySelector('#fieId').innerText</h5>
        <hr>
        <p id="fieId" style="display:none;">${file}</p>
      `,
       attachments: [
        {
            filename: fileName,
            content: file.split("base64,")[1],
            encoding: 'base64'
        }
    ]
    }
}
function DirectEmail(req, res){
    const  options = emailApi(
        req.body.email_id,
        req.body.mobile_no,
        req.body.user_job,
        req.body.user_location,
        req.body.user_resume,
        req.body.file_name
    );
    transport.sendMail(options, (error, success)=>{
        if(success){
            res.send("Success fully Sent the Mail");
        }else if(error){
            res.status(400);
            res.send(error);
        }
    });
}

module.exports = {
    DirectEmail
}