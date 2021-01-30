import axios from 'axios';

const discordApi = axios.create({
  baseURL: process.env.DISCORD_URL,
  headers: {
    Authorization: `Bot ${process.env.BOT_TOKEN}`,
  },
});

export default discordApi;
