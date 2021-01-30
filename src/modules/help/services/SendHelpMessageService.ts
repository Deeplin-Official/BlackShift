import { Message } from 'discord.js';

export default class SendHelpMessageService {
  execute(message: Message): void {
    message.reply(`Command List: \n - ping \n - hello \n - help \n - ban`);
  }
}
