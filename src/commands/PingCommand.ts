import { Message } from 'discord.js';

export default class PingCommand {
  execute(message: Message): void {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }
}
