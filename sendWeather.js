const getWeather = require("./getWeather");

module.exports = async function sendWeather(ctx, city) {
  try {
    const messageData = await getWeather(city, ctx);
    return ctx.replyWithMarkdown(messageData);
  } catch (error) {
    throw new Error(error);
    console.log(error);
  }
};
