// const express = require('express')
// const app = express();
// const axios = require('axios')
// const path = require('path')
// require('dotenv').config();
// const { Telegraf } = require('telegraf')
// const bot = new Telegraf(process.env.BOT_TOKEN)

// const port = process.env.PORT || 3000;

// app.use(express.static('static'))
// app.use(express.json())

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + 'index.html'))
// })

// bot.command('start', ctx => {
//     console.log(ctx.from)
//     bot.telegram.sendMessage(ctx.chat.id, `Hello There! Welcome to Kingsley's bot. Respond to /ethereum, please try it...`, {

//     })

// })

// bot.command('ethereum', ctx => {
//     var rate;
//     console.log(ctx.from)
//     axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
//     .then(response => {
//         console.log(response.data)
//         rate = response.data.ethereum
//         const message = `Hello, today the price of ethereum is at ${rate.usd}USD`;
//         bot.telegram.sendMessage(ctx.chat.id, message)
//     })
// })

// bot.launch();
