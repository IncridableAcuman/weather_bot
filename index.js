const axios = require("axios");
const redis = require("redis");
const {Telegraf,Markup} = require("telegraf");
require("dotenv").config();
const getWeather=require("./getWeather");

const telebotToken = process.env.TELEBOT_TOKEN || null;

const bot = new Telegraf(telebotToken);


bot.help((msg)=>msg.reply("Yordam xizmati hozircha ishlamaydi."));

bot.command("start",(ctx)=>{
    return ctx.reply(
        "Assalomu aleykum, Enter a place:",
        Markup.keyboard([
            ["Uzbekistan","Tashkent"],
            ['Kharezm',"Urgench"],
            ["Khiva","Bukhara"],
            ['Samarkand',"Others"]
        ])
        .oneTime()
        .resize()
    );
});

bot.hears("Uzbekistan",async (msg)=>{
    const messageData = await getWeather(msg.message.text);
   return msg.reply(messageData);
});

bot.hears("Tashkent",async (msg)=>{
    const messageData = await getWeather(msg.message.text);
   return msg.reply(messageData);
});

bot.hears("Kharezm",async (msg)=>{
    const messageData = await getWeather(msg.message.text);
   return msg.reply(messageData);
});

bot.hears("Urgench",async (msg)=>{
    const messageData = await getWeather(msg.message.text);
   return msg.reply(messageData);
});

bot.hears("Khiva",async (msg)=>{
    const messageData = await getWeather(msg.message.text);
   return msg.reply(messageData);
});

bot.hears("Bukhara",async (msg)=>{
    const messageData = await getWeather(msg.message.text);
   return msg.reply(messageData);
});

bot.hears("Samarkand",async (msg)=>{
    const messageData = await getWeather(msg.message.text);
   return msg.reply(messageData);
});

bot.hears("Others",async (msg)=>{
    const messageData = await getWeather(msg.message.text);
   return msg.reply(messageData);
});

bot.launch();

process.once("SIGINT",()=>bot.stop());
process.once("SIGTERM",()=>bot.stop());
console.log("Telegram bot running...");