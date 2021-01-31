import { Message } from 'discord.js';
import { container } from 'tsyringe';

import BotMessageService from '@shared/services/BotMessageService';

export default class SendHelpMessageService {
  async execute(message: Message): Promise<void> {
    const sendBotMessage = container.resolve(BotMessageService);

    await sendBotMessage.execute({
      discordMessage: message,
      message: `Command List: \n - ping \n - hello \n - help \n - ban \n - addStaff \n - rmStaff`,
    });
  }
}
