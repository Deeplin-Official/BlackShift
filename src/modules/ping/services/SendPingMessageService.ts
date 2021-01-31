import BotMessageService from '@shared/services/BotMessageService';
import { Message } from 'discord.js';
import { container } from 'tsyringe';

export default class SendPingMessageService {
  async execute(message: Message): Promise<void> {
    const sendBotMessage = container.resolve(BotMessageService);

    const timeTaken = Date.now() - message.createdTimestamp;
    await sendBotMessage.execute({
      discordMessage: message,
      message: `Pong! This message had a latency of ${timeTaken}ms.`,
    });
  }
}
