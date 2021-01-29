import { Message } from 'discord.js';

export default class HelloCommand {
  execute(message: Message): void {
    message.reply(`Hello ${message.author.username}, how are you ???`);
  }
}
