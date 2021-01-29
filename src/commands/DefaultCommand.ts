import { Message } from 'discord.js';

export default class DefaultCommand {
  execute(message: Message): void {
    message.reply(
      "Oooh, i can't understand that command please do 'help' to list all existent commands",
    );
  }
}
