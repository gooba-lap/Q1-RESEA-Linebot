const line = require("@line/bot-sdk");
const express = require("express");
const axios = require("axios").default;
const dotenv = require("dotenv");

const env = dotenv.config().parsed;
const app = express();

const lineConfig = {
    channelAccessToken: env.ACCESS_TOKEN,
    channelSecret: env.SECRET_TOKEN,
};
// create client
const client = new line.Client(lineConfig);

app.post("/webhook", line.middleware(lineConfig), async (req, res) => {
    try {
        const events = req.body.events;
        console.log("event >>>>", events);
        return events.length > 0
            ? await events.map((item) => handleEvent(item))
            : res.status(200).send("OK");
    } catch (error) {
        res.status(500).end();
    }
});

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

//

const handleEvent = async (event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return null;
    }
    else if (event.type === 'message') {
        if (event.message.text === "ขอรายละเอียด") {
            messageAll = [
                // { type: "text", text: " ⚡️ Todo \n ⚡️ User \n ⚡️ Point \n ⚡️ Promotion \n ⚡️ ..."},
                { type: "text", text: 
                    " 🎃 All command " +
                    "\n cmd : ขอรายละเอียด " +
                    "\n cmd : Todo " +
                    "\n cmd : User " +
                    "\n cmd : Point " + 
                    "\n cmd : Promotion" +
                    "\n " +
                    "\n 🎃 Doing " +
                    "\n 1 " +
                    "\n 2 "  
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
    }
};


// xxxxxxxxxx xxxxxxxxxx xxxxxxxxxx xxxxxxxxxx


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