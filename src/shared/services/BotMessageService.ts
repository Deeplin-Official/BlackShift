import { Message } from 'discord.js';

interface IRequest {
  discordMessage: Message;
  message: string;
}

export default class BotMessageService {
  async execute({ discordMessage, message }: IRequest): Promise<void> {
    await discordMessage.channel.send(message);
  }
}
