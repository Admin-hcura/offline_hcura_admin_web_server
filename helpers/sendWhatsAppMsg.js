const axios = require('axios');
const { model } = require('mongoose');
const whatsapptoken = "EAARheJ4rHpUBOy24A6c04KHib4KTiAW72kyEu90LfrQ8okercaxkuYXEUy1ZBLpvdlZBxrEvImSCHe1K5pmZCVOekiNXTEeiuqpl9g8TjgLyZCnNbWYRX0vNyQbXtExAEWsXEZAB4MvrwGoLWYBaJdLFB5cXxHVQggMqkNF2yHtgoZCK1DbQtZAJeO1j6boZARfQ8ZAHEMcz3iZAjfODbKjVNhFiTcbXcZD"

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
            url: 'https://graph.facebook.com/v21.0/428296813705977/messages',
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
    };

};

module.exports = new whatsApp();