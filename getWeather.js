const axios=require("axios");
const formatWeather=require("./formatWeather");
module.exports=async function getWeather(text){
    const key=process.env.API_KEY || "12";
    try {
        const url=process.env.WEATHER_URL+`?q=${text}&appid=${key}`;
        const {data} = await axios.get(url);
        return formatWeather(data);
    } catch (error) {
        throw new Error("Notwork error",error);
        
    }
}