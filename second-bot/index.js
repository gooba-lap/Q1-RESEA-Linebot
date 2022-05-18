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
        console.log("event=>>>>", events);
        return events.length > 0
            ? await events.map((item) => handleEvent(item))
            : res.status(200).send("OK");
    } catch (error) {
        res.status(500).end();
    }
});

// const handleEvent = async (event) => {
//     if(event.type !== 'message' || event.message.type !== 'text'){
//         return null;
//     }
//     else if (event.type === 'message'){
//         return client.replyMessage(event.replyToken,{type:'text',text:'ง่วงนอน 🤤'})
//     }
// }

const handleEventxxx = async (event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return null;
    }
    else if (event.type === 'message') {
        const { data } = await axios.get(`https://${env.RAPID_URL}/words/${event.message.text}/synonyms`, {
        headers: {
            'x-rapidapi-host': env.RAPID_URL,
            'x-rapidapi-key': env.RAPID_KEY
        }
    })
        console.log('Data-> ', data)
        const { synonyms } = data
        let str = ''
        synonyms.forEach((result, i) => {
            // str += synonyms.length - 1 !== i ? `${result}\n` : result
            if (synonyms.length - 1 !== i){
                str += `${result}\n`
            } else {
                str += result
            }
        })
        console.log("STR =>>>>", str)
        return client.replyMessage(event.replyToken, { type: 'text', text: str });
    }
}

// xxxxxxxxxx xxxxxxxxxx xxxxxxxxxx xxxxxxxxxx

const handleEvent = async (event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return null;
    }
    else if (event.type === 'message'){
        try {
            const { data } = await axios.get(
                `https://jsonplaceholder.typicode.com/todos/1`
            ); //use data destructuring to get data from the promise object
            console.log("Data -> ", data);
            //   const { synonyms } = data
            //   let str = ''
            //   synonyms.forEach((result, i) => {
            //     str += synonyms.length - 1 !== i ? `${result}\n` : result
            //   })
            messageAll = [
                { type: "text", text: "userId : " + data.userId },
                { type: "text", text: "id : " + data.id },
                { type: "text", text: "title : " + data.title },
                { type: "text", text: "completed : " + data.completed },
            ];
            console.log("messageAll -> ", messageAll);
    
            return client.replyMessage(event.replyToken, messageAll);
        } catch (error) {
            console.log(error);
        }
    }
};

app.listen(4000, () => {
    console.log("listening on 4000");
});
