
TWILLO MESSAGE API SERVICES,

Send the message to anyone,
1) https://app-yx1k.onrender.com/send-message
    Content-Length : application/json
    PAYLOAD: {
        "message": "common",
        "phone": "+917204447908"
    }

2) https://app-yx1k.onrender.com/send-otp
    Content-Length : application/json
    PAYLOAD: {
        "phoneNumber": "+917204447908"
    }

3) https://app-yx1k.onrender.com/verify-otp
    Content-Length : application/json
    PAYLOAD: {
        "code": "321784",
        "phoneNumber": "+917204447908"
    }