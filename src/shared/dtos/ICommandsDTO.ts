import { Message } from 'discord.js';

export default interface IRunCommandsDTO {
  message: Message;
  command: string;
  secondArgument?: string;
}
