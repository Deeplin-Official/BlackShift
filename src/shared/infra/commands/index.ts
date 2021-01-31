import { container } from 'tsyringe';

import IRunCommandsDTO from '@shared/dtos/ICommandsDTO';

import Hello from '@modules/hello/services/SendHelloMessageService';
import Help from '@modules/help/services/SendHelpMessageService';
import Ping from '@modules/ping/services/SendPingMessageService';
import Ban from '@modules/ban/services/SendBanMessageService';
import Staff from '@modules/staff/services/SendStaffUserMessageService';

import BotMessageService from '@shared/services/BotMessageService';

export default class RunCommands {
  async execute({ command, message }: IRunCommandsDTO): Promise<void> {
    const helloCommand = container.resolve(Hello);
    const helpCommand = container.resolve(Help);
    const pingCommand = container.resolve(Ping);
    const banCommand = container.resolve(Ban);
    const staffCommand = container.resolve(Staff);

    const sendBotMessage = container.resolve(BotMessageService);

    switch (command) {
      case 'hello':
        await helloCommand.execute(message);
        break;

      case 'help':
        await helpCommand.execute(message);
        break;

      case 'ping':
        await pingCommand.execute(message);
        break;

      case 'ban':
        await banCommand.execute(message);
        break;

      case 'addStaff':
        await staffCommand.execute({ message, method: 'add' });
        break;

      case 'rmStaff':
        await staffCommand.execute({ message, method: 'remove' });
        break;

      default:
        await sendBotMessage.execute({
          discordMessage: message,
          message:
            "Oooh, i can't understand that command please do 'help' to list all existent commands",
        });
        break;
    }
  }
}
