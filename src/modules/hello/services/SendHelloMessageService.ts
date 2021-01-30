import { Message } from 'discord.js';

export default class SendHelloMessageService {
  execute(message: Message): void {
    message.channel.send(`Hello, how are you ???`);
  }
}
