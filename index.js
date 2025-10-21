const axios = require("axios");
const redis = require("redis");
const {Telegraf,Markup} = require("telegraf");
require("dotenv").config();

const telebotToken = process.env.TELEBOT_TOKEN || null;

const bot = new Telegraf(telebotToken);

bot.help((msg)=>msg.reply("Yordam xizmati hozircha ishlamaydi."));

bot.command("start",(ctx)=>{
    return ctx.reply(
        "Assalomu aleykum",
        Markup.keyboard([
            ["Uzbekistan","Tashkent"]
        ])
        .oneTime()
        .resize()
    );
});
bot.launch();

process.once("SIGINT",()=>bot.stop());
process.once("SIGTERM",()=>bot.stop());
console.log("Telegram bot running...");