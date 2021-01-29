import 'reflect-metadata';
import 'dotenv/config';

import { Client as DiscordClient, Message } from 'discord.js';
import { container } from 'tsyringe';

import RunCommands from '../commands';

export default class App {
  discordClient: DiscordClient;

  prefix: '!';

  constructor() {
    this.discordClient = new DiscordClient();
    this.prefix = '!';
    this.ListenCommands();
  }

  private async ListenCommands(): Promise<void> {
    const runCommands = container.resolve(RunCommands);

    this.discordClient.on('message', async (message: Message) => {
      if (message.author.bot || message.content.substr(0, 1) !== this.prefix)
        return;

      const commandBody = message.content.slice(this.prefix.length);
      const args = commandBody.split(' ');

      const command = args.shift()?.toLowerCase();

      if (command !== 'ctos') return;

      if (command?.toLocaleLowerCase() === 'ctos') {
        runCommands.execute({ command: args[0], message });
      }
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
