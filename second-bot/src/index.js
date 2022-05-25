const line = require("@line/bot-sdk");
const express = require("express");
const axios = require("axios").default;
const dotenv = require("dotenv");

const env = dotenv.config().parsed;
const app = express();

// mock data api
var cors = require('cors')
const importData = require("../src/mockdata/mockdata.json")
app.use(cors())

const lineConfig = {
    channelAccessToken: env.ACCESS_TOKEN,
    channelSecret: env.SECRET_TOKEN,
};

// create client
const client = new line.Client(lineConfig);

app.post("/webhook", line.middleware(lineConfig), async (req, res) => {
    try {
        const events = req.body.events;
        console.log("event 😵‍💫 ", events);
        return events.length > 0
            ? await events.map((item) => handleEvent(item))
            : res.status(200).send("OK");
    } catch (error) {
        res.status(500).end();
    }
});

// xxxxxxxxxx xxxxxxxxxx xxxxxxxxxx xxxxxxxxxx

// GET method route
app.get('/webhook', async (req, res) => {
    res.send("hi")
    // try {
    //     const events = req.body.events;
    //     console.log("event 😵‍💫 ", events);
    //     return events.length > 0
    //         ? await events.map((item) => handleEvent(item))
    //         : res.status(200).send("OK");
    // } catch (error) {
    //     res.status(500).end();
    // }
})

// xxxxxxxxxx xxxxxxxxxx xxxxxxxxxx xxxxxxxxxx

// mock data api
app.get('/mockdata', (req, res) => {
    res.send(importData);
})

// xxxxxxxxxx xxxxxxxxxx xxxxxxxxxx xxxxxxxxxx

// const handleEvent = async (event) => {
//     if (event.type !== 'message' || event.message.type !== 'text') {
//         return null;
//     }
//     else if (event.type === 'message') {
//         try {
//             const { data } = await axios.get(
//                 `https://jsonplaceholder.typicode.com/todos/${event.message.text}`
//             ); //use data destructuring to get data from the promise object
//             console.log("Data -> ", data);
//             messageAll = [
//                 { type: "text", text: "userId : " + data.userId },
//                 { type: "text", text: "id : " + data.id },
//                 { type: "text", text: "title : " + data.title },
//                 { type: "text", text: "completed : " + data.completed },
//             ];
//             console.log("messageAll -> ", messageAll);

//             return client.replyMessage(event.replyToken, messageAll);
//         } catch (error) {
//             console.log(error);
//         }
//     }
// };

const handleEvent = async (event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return null;
    }

    else if (event.type === 'message') {
        if (event.message.text === "ขอรายละเอียด") {
            messageAll = [
                { 
                    "type": "text", 
                    "text": "เลือกรายการที่คุณต้องการ 😆",
                    "quickReply": { 
                        "items": [    
                        // {
                        //     "type": "action", 
                        //     "action": {
                        //     "type": "location",
                        //     "label": "Send location"
                        //     }
                        // },
                        {
                            "type": "action",
                            "action": {
                            "type": "message",
                            "label": "🎃 ร้านอยู่ที่ไหน",
                            "text": "ร้านอยู่ไหน"
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                            "type": "message",
                            "label": "🎃 ข้อมูลติดต่อ",
                            "text": "ข้อมูลติดต่อ"
                            }
                        },
                        {
                            "type": "action",
                            // "imageUrl": "https://example.com/tempura.png",
                            "action": {
                            "type": "message",
                            "label": "ออก",
                            "text": "."
                            }
                        }
                        ]
                    }
                }
            ];
            console.log("messageAll -> ", messageAll);
            return client.replyMessage(event.replyToken, messageAll);
        }

        // TODO
        else if (event.message.text === "Todo") {
            try {
                const { data } = await axios.get(
                    `https://jsonplaceholder.typicode.com/todos/1`
                ); //use data destructuring to get data from the promise object
                console.log("Data -> ", data);
                messageAll = [
                    { type: "text", text: 
                        " userId : " + data.userId + 
                        "\n id : " + data.id + 
                        "\n title : " + data.title + 
                        "\n completed : " + data.completed 
                    },
                ];
                console.log("messageAll -> ", messageAll);
    
                return client.replyMessage(event.replyToken, messageAll);
            } catch (error) {
                console.log(error);
            }
        }

        // USER
        else if (event.message.text === "User") {
            try {
                const { data } = await axios.get(
                    `https://jsonplaceholder.typicode.com/users/1`
                ); //use data destructuring to get data from the promise object
                console.log("Data -> ", data);
                messageAll = [
                    { type: "text", text: 
                        " id : " + data.id  +
                        "\n name : " + data.name +
                        "\n username : " + data.username +
                        "\n email : " + data.email +
                        "\n phone : " + data.phone
                    },
                ];
                console.log("messageAll -> ", messageAll.text);
                return client.replyMessage(event.replyToken, messageAll);
            } catch (error) {
                console.log(error);
            }
        }

        // POINT
        else if (event.message.text === "Point") {
            try {
                // const { data } = await axios.get(
                //     `{mock}https://localhost/point`
                // ); 
                // console.log("Data -> ", data);
                messageAll = [
                    { type: "text", text: 
                        " You have 999,999 Point \n ซื้อของเพื่อสะสมเเต้มเพิ่ม 😆" 
                    },
                ];
                console.log("messageAll -> ", messageAll);
                return client.replyMessage(event.replyToken, messageAll);
            } catch (error) {
                console.log(error);
            }
        }

        // PROMOTION
        else if (event.message.text === "Promotion") {
            try {
                // const { data } = await axios.get(
                //     `{mock}https://localhost/PROMOTION`
                // ); 
                // console.log("Data -> ", data);
                messageAll = [
                    { type: "text", text: 
                        "promotion วันนี้ มื้อนี้อย่างคุ้ม! ปรากฏการณ์ลดเยอะกว่า รับส่วนลดสูงสุด 560 บาท " 
                    },
                ];
                console.log("messageAll -> ", messageAll);
                return client.replyMessage(event.replyToken, messageAll);
            } catch (error) {
                console.log(error);
            }
        }

        // ...
        else if (event.message.text === "...") {
            try {
                messageAll = [
                    {
                        "type": "template",
                        "altText": "This is a buttons template",
                        "template": {
                            "type": "buttons",
                            "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
                            "imageAspectRatio": "rectangle",
                            "imageSize": "cover",
                            "imageBackgroundColor": "#FFFFFF",
                            "title": "Menu",
                            "text": "Please select",
                            "defaultAction": {
                                "type": "uri",
                                "label": "View detail",
                                "uri": "http://example.com/page/123"
                            },
                            "actions": [
                                {
                                  "type": "postback",
                                  "label": "Buy",
                                  "data": "action=buy&itemid=123"
                                },
                                {
                                  "type": "postback",
                                  "label": "Add to cart",
                                  "data": "action=add&itemid=123"
                                },
                                {
                                  "type": "uri",
                                  "label": "View detail",
                                  "uri": "http://example.com/page/123"
                                }
                            ]
                        }
                      }
                ];
                console.log("messageAll -> ", messageAll);
                return client.replyMessage(event.replyToken, messageAll);
            } catch (error) {
                console.log(error);
            }
        }
    }
};

app.listen(4000, () => {
    console.log("listening on 4000");
});






// 🧪 success
// const handleEvent = async (event) => {
//     if(event.type !== 'message' || event.message.type !== 'text'){
//         return null;
//     }
//     else if (event.type === 'message'){
//         return client.replyMessage(event.replyToken,{type:'text',text:'ง่วงนอน 🤤'})
//     }
// }


// 🧪 example
// const handleEvent = async (event) => {
//     if (event.type !== 'message' || event.message.type !== 'text') {
//         return null;
//     }
//     else if (event.type === 'message') {
//         const { data } = await axios.get(`https://${env.RAPID_URL}/words/${event.message.text}/synonyms`, {
//         headers: {
//             'x-rapidapi-host': env.RAPID_URL,
//             'x-rapidapi-key': env.RAPID_KEY
//         }
//     })
//         console.log('Data-> ', data)
//         const { synonyms } = data
//         let str = ''
//         synonyms.forEach((result, i) => {
//             // str += synonyms.length - 1 !== i ? `${result}\n` : result
//             if (synonyms.length - 1 !== i){
//                 str += `${result}\n`
//             } else {
//                 str += result
//             }
//         })
//         console.log("STR =>>>>", str)
//         return client.replyMessage(event.replyToken, { type: 'text', text: str });
//     }
// }