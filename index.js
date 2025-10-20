const express = require("express");
const axios = require("axios");
const redis = require("redis");
const {Telegraf} = require("telegraf");
require("dotenv").config();

const telebotToken = process.env.TELEBOT_TOKEN || null;

const app = express();
const bot = new Telegraf(telebotToken);

bot.start((msg)=>msg.reply("Hi"));
bot.launch();

process.once("SIGINT",()=>bot.stop());
process.once("SIGTERM",()=>bot.stop());