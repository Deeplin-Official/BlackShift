import { Message } from 'discord.js';
import { container } from 'tsyringe';

import BotMessageService from '@shared/services/BotMessageService';

export default class SendHelloMessageService {
  async execute(message: Message): Promise<void> {
    const sendMessage = container.resolve(BotMessageService);

    await sendMessage.execute({
      discordMessage: message,
      message: `Hello, how are you ???`,
    });
  }
}
