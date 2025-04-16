const axios = require('axios');
const { model } = require('mongoose');
const whatsapptoken = "EAARheJ4rHpUBO8gjkfI44tXe6gSAr4YveHKeSn41rcvUwzsxqfYnbQ4xZCbJ5ZCws9uKzX6yTR2wskTuYMNvsARVwfF8sfNAgcwucplZAbPkAA3ZBJAzogZCYAa5dkjQJ6QazONxwlhIiTbkTQ8jTUch3IuZCbC8tadObfL7fcAK3R8jT2Id4Q2CYZAuM2DKB5sFAZDZD"

class whatsApp {
    async whatsappapi(req, res, next){
        try{
            let body = req.body;
            let name = "manoj"
            let emailId = "dandumanojkumarreddy@gmail.com"
            let phonenumber = 9676097350
            const response = await axios({
                url: 'https://graph.facebook.com/v21.0/428296813705977/messages',
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${whatsapptoken}`,
                    'Content-Type': 'application/json'
                },
    
                // to send custom templete
                data: JSON.stringify({
                    messaging_product: 'whatsapp',
                    to: '917411845658',
                    type: 'template',
                    template: {
                        name: 'pt_appointment_booked',
                        language: {
                            code: 'en_US'
                        },
                    components: [
                        {
                            type: 'body',
                            parameters: [
                                {
                                    type: 'text',
                                    text: name  
                                },
                                {
                                    type: 'text',
                                    text: phonenumber  
                                },
                                {
                                    type: 'text',
                                    text: emailId
                                },
                                {
                                    type: 'text',
                                    text: emailId
                                },
                            ]
                        }
                    ]
                }
            })
        })
        console.log("------------",response.data)
        res.status(200).send({ status: true, data: response.data });
        } catch(e){
            next(e);
        }
    };

    async sendWhatsAppMsgToAdmin(name, age, phoneNo, whatsAppNo, emailId, 
        gender, state, consultationType, message, branch, formId ){
        
        try{
            if(name === "" || name === null){
                name = "NA"
            }
            if(age === "" || age === null){
                age = "NA"
            }
            if(phoneNo === "" || phoneNo === null){
                phoneNo = "NA"
            }
            if(whatsAppNo === "" || whatsAppNo === null){
                whatsAppNo = "NA"
            }
            if(emailId === "" || emailId === null){
                emailId = "NA"
            }
            if(gender === "" || gender === null){
                gender = "NA"
            }
            if(state === "" || state === null){
                state = "NA"
            }
            if(consultationType === "" || consultationType === null){
                consultationType = "NA"
            }
            if(message === "" || message === null){
                message = "NA"
            }
            if(branch === "" || branch === null){
                branch = "NA"
            }
            if(formId === "" || formId === null){
                formId = "NA"
            }
    
            // console.log("=========",name,age,phoneNo,whatsAppNo,emailId,
            //     gender,state,consultationType,message,branch,formId)
    
            let msg = "WEB LEAD"
            let adminNo = '917411845658'
            // let branchs = "JAJ"
            const response = await axios({
                url: 'https://graph.facebook.com/v21.0/520938667772155/messages',
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${whatsapptoken}`,
                    'Content-Type': 'application/json'
                },
    
                // to send custom templete
                data: JSON.stringify({
                    messaging_product: 'whatsapp',
                    to: adminNo,
                    type: 'template',
                    template: {
                        name: 'appt_pt_form_newweb',
                        language: {
                            code: 'en_US'
                        },
                    components: [
                        {
                            type: 'body',
                            parameters: [
                                {
                                    type: 'text',
                                    text: name  
                                },
                                {
                                    type: 'text',
                                    text: phoneNo  
                                },
                                {
                                    type: 'text',
                                    text: whatsAppNo
                                },
                                {
                                    type: 'text',
                                    text: emailId
                                },
                                {
                                    type: 'text',
                                    text: age  
                                },
                                {
                                    type: 'text',
                                    text: gender  
                                },
                                {
                                    type: 'text',
                                    text: state
                                },
                                {
                                    type: 'text',
                                    text: consultationType
                                },
                                {
                                    type: 'text',
                                    text: branch  
                                },
                                {
                                    type: 'text',
                                    text: message  
                                },
                                {
                                    type: 'text',
                                    text: msg
                                },
                            ]
                        }
                    ]
                }})
            })
            return response.data;
        } catch(e){
            console.error('API Request Error:', e.response?.data || e.message);
        }
    };

    async appointmentForm(name, age, phoneNo, whatsAppNo, emailId,
        gender, state, consultationType, message, branch, formId) {
            try {
                console.log("-------00000000000------",name, age, phoneNo, whatsAppNo, emailId, gender, state, consultationType, message, branch, formId)
                name = name || "NA";
                age = age || "NA";
                phoneNo = phoneNo || "NA";
                whatsAppNo = whatsAppNo || "NA";
                emailId = emailId || "NA";
                gender = gender || "NA";
                state = state || "NA";
                consultationType = consultationType || "NA";
                message = message || "NA";
                branch = branch || "NA";
                formId = formId || "NA";

                const response = await axios({
                    url: 'https://api.ownchat.app/apis/v1/chat/send-message',
                    method: 'post',
                    headers: {
                        'OWNCHAT-API-KEY': `${process.env.OWNCHAT_API_KEY}`,
                        'OWNCHAT-API-SECRET' : `${process.env.OWNCHAT_API_SECRET}`,
                        'Content-Type': 'application/json'
                    },

                    data: JSON.stringify(
                        {
                            "messaging_product": "whatsapp",
                            "recipient_type": "individual",
                            "recipient_name": "Dear",
                            "to": `${process.env.WhatsApp_Default_Mobile}`,
                            "type": "template",
                            "template": {
                                "name": "appointment_form",
                                "language": {
                                    "code": "en_US"
                                },
                                "components": [
                                    // {
                                    //     "type": "header",
                                    //     "parameters": [
                                    //         {
                                    //             "type": "text",
                                    //             "text": "Haje"
                                    //         }
                                    //     ]
                                    // },
                                    {
                                        "type": "body",
                                        "parameters": [
                                            { "type": "text", "text": name },
                                            { "type": "text", "text": age },
                                            { "type": "text", "text": phoneNo },
                                            { "type": "text",  "text": whatsAppNo },
                                            { "type": "text", "text": emailId },
                                            { "type": "text", "text": gender },
                                            { "type": "text", "text": state },
                                            { "type": "text", "text": consultationType },
                                            { "type": "text", "text": branch },
                                            { "type": "text", "text": message },
                                            { "type": "text", "text": formId }
                                        ]
                                    }
                                ]
                            }
                        }
                    )
                })
                return response.data;
            } catch(e) {
                console.error('API Request Error:', e.response?.data || e.message);
            }
    };

};

module.exports = new whatsApp();