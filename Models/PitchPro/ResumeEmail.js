
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
// function baseDecode(fileLink){
//     var link = document.createElement('a');
//     link.innerHTML = 'Download PDF file';
//     link.href = userResume;
//     link.download = fileLink;
//     link.target = '_blank';
//     return link;
//   }
function emailApi(email, mobile, location, job, file){
    
    return {
      from: 'yuvaraj.mail.services@gmail.com',
      to: 'yuvayuvaraj720444@gmail.com',
      subject: "Direct Pitch Pro Carrers",
      html: `
        <h3>Carrers Entry from</h3>
        <h4>Email: ${email}</h4>
        <h4>Mobile: ${mobile}</h4>
        <h4>Location: ${location}</h4>
        <h4>Job: ${job}</h4>
        <button>Download File</button>
        <p>${file}</p>
      `
    }
}
function DirectEmail(req, res){
    const  options = emailApi(
        req.body.email_id,
        req.body.mobile_no,
        req.body.user_job,
        req.body.user_location,
        req.body.user_resume
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