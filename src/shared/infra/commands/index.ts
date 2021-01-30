import { container } from 'tsyringe';

import IRunCommandsDTO from '@shared/dtos/ICommandsDTO';

import Hello from '@modules/hello/services/SendHelloMessageService';
import Help from '@modules/help/services/SendHelpMessageService';
import Ping from '@modules/ping/services/SendPingMessageService';
import Ban from '@modules/ban/services/SendBanMessageService';

export default class RunCommands {
  execute({ command, message, secondArgument }: IRunCommandsDTO): void {
    const helloCommand = container.resolve(Hello);
    const helpCommand = container.resolve(Help);
    const pingCommand = container.resolve(Ping);
    const banCommand = container.resolve(Ban);

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
        if (!secondArgument) return;

        banCommand.execute(message, secondArgument);
        break;

      default:
        message.channel.send(
          "Oooh, i can't understand that command please do 'help' to list all existent commands",
        );
        break;
    }
  }
}
