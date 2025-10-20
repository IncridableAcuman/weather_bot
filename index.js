const express = require("express");
const axios = require("axios");
const redis = require("redis");
const Telebot = require("telebot");
require("dotenv").config();

const telebotToken = process.env.TELEBOT_TOKEN || null;

const app = express();
const bot = new Telebot(telebotToken);

bot.on("text", (msg) => {
  msg.reply.text(msg.text);
});

bot.start();
