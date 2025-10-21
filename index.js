const axios = require("axios");
const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const sendWeather = require("./sendWeather");

const telebotToken = process.env.TELEBOT_TOKEN || null;

const bot = new Telegraf(telebotToken);

bot.help((msg) => msg.reply("Yordam xizmati hozircha ishlamaydi."));

bot.command("start", (ctx) => {
  return ctx.reply(
    "Assalomu aleykum",
    Markup.keyboard([
      ["Uzbekistan", "Tashkent"],
      ["Nukus", "Urgench"],
      ["Khiva", "Bukhara"],
      ["Samarkand", "Others"],
    ])
      .oneTime()
      .resize()
  );
});

[
  "Uzbekistan",
  "Tashkent",
  "Nukus",
  "Urgench",
  "Khiva",
  "Bukhara",
  "Samarkand",
].forEach((city) => {
  bot.hears(city, (ctx) => sendWeather(ctx, city));
});

const userState = {};

bot.hears("Others", async (msg) => {
  await msg.reply("Enter a place:");
  userState[msg.from.id] = "awating_place";
});

bot.on("text", async (ctx) => {
  try {
    const state = userState[ctx.from.id];
    if (state === "awating_place") {
        const place = ctx.message.text;
        await sendWeather(ctx, place);
        delete userState[ctx.from.id];
    }
  } catch (error) {
    ctx.reply("No such place found");
  }
});

bot.launch();

process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());
console.log("Telegram bot running...");
