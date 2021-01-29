import 'dotenv/config';

import { Client as DiscordClient, Message } from 'discord.js';

export default class App {
  discordClient: DiscordClient;

  prefix: '!';

  constructor() {
    this.discordClient = new DiscordClient();
    this.prefix = '!';
    this.runCommands();
  }

  async runCommands(): Promise<void> {
    this.discordClient.on('message', async (data: Message) => {
      if (data.author.bot) return;

      if (data.content.substr(0, 1) !== this.prefix) return;

      const commandBody = data.content.slice(this.prefix.length);
      const args = commandBody.split(' ');

      const command = args.shift()?.toLowerCase();

      if (command !== 'ctos') return;

      // Implement commands here!
    });
  }

  async start(): Promise<void> {
    try {
      await this.discordClient.login(process.env.BOT_TOKEN);

      console.log('🚀️ Successful connection.');
    } catch (error) {
      console.log('😥️ Something wrong is creadentials.');
      console.log(error);
    }
  }
}
