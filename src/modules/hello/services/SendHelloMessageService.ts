import { Message } from 'discord.js';

export default class SendHelloMessageService {
  execute(message: Message): void {
    message.reply(`Hello, how are you ???`);
  }
}
