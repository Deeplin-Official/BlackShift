import 'reflect-metadata';
import 'dotenv/config';

import { Client as DiscordClient, Message } from 'discord.js';
import { container } from 'tsyringe';

import databaseConnection from '../typeorm';

import RunCommands from '../commands';

import '@shared/infra/container';

export default class App {
  private discordClient: DiscordClient;

  private prefix: '$';

  constructor() {
    this.discordClient = new DiscordClient();
    this.prefix = '$';
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

      if (command !== 'bs') return;

      if (command?.toLocaleLowerCase() === 'bs') {
        try {
          await runCommands.execute({
            command: args[0],
            message,
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  async start(): Promise<void> {
    try {
      await databaseConnection();
      await this.discordClient.login(process.env.BOT_TOKEN);

      console.log('🚀️ Successful connection.');
    } catch (error) {
      console.log('😥️ Something wrong is creadentials.');
      console.log(error);
    }
  }
}
