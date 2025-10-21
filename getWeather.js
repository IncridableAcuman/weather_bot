const axios = require("axios");
const redis = require("redis");
const formatWeather = require("./formatWeather");

const client = redis.createClient();

(async ()=>{
  client.on("error",(error)=>console.log(error));
  await client.connect();
  console.log("✅ Redis connected");
})()


module.exports = async function getWeather(text, ctx) {
  const redisKey = `weather:${text}`;
  const key = process.env.API_KEY || "12";
  try {
    const cached = await client.get(redisKey);
    if (cached) {
      const data = JSON.parse(cached);
      return formatWeather(data);
    }
    const url = process.env.WEATHER_URL + `?q=${text}&appid=${key}`;
    const { data } = await axios.get(url);
    const redisData = JSON.stringify(data);
    await client.setEx(`weather:${text}`, 3600, redisData);
    return formatWeather(data);
  } catch (error) {
    return ctx.reply("Network Error");
    console.log(error);
  }
};
