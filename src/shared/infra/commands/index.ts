import { container } from 'tsyringe';

import IRunCommandsDTO from '@shared/dtos/ICommandsDTO';

import Hello from '@modules/hello/services/SendHelloMessageService';
import Help from '@modules/help/services/SendHelpMessageService';
import Ping from '@modules/ping/services/SendPingMessageService';
import Ban from '@modules/ban/services/SendBanMessageService';
import Staff from '@modules/staff/services/SendStaffUserMessageService';

export default class RunCommands {
  execute({ command, message }: IRunCommandsDTO): void {
    const helloCommand = container.resolve(Hello);
    const helpCommand = container.resolve(Help);
    const pingCommand = container.resolve(Ping);
    const banCommand = container.resolve(Ban);
    const staffCommand = container.resolve(Staff);

    switch (command) {
      case 'hello':
        helloCommand.execute(message);
        break;

      case 'help':
        helpCommand.execute(message);
        break;

      case 'ping':
        pingCommand.execute(message);
        break;

      case 'ban':
        banCommand.execute(message);
        break;

      case 'addStaff':
        staffCommand.execute({ message, method: 'add' });
        break;

      case 'rmStaff':
        staffCommand.execute({ message, method: 'remove' });
        break;

      default:
        message.channel.send(
          "Oooh, i can't understand that command please do 'help' to list all existent commands",
        );
        break;
    }
  }
}
