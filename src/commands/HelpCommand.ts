import { Message } from 'discord.js';

export default class PingCommand {
  execute(message: Message): void {
    message.reply(`Command List: \n - ping \n - hello \n - help`);
  }
}
