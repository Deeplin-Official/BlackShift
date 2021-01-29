import { container } from 'tsyringe';

import IRunCommandsDTO from '@shared/dtos/ICommandsDTO';

import Hello from '@modules/hello/services/SendHelloMessageService';
import Help from '@modules/help/services/SendHelpMessageService';
import Ping from '@modules/ping/service/SendPingMessageService';

export default class RunCommands {
  execute({ command, message }: IRunCommandsDTO): void {
    const helloCommand = container.resolve(Hello);
    const helpCommand = container.resolve(Help);
    const pingCommand = container.resolve(Ping);

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

      default:
        message.reply(
          "Oooh, i can't understand that command please do 'help' to list all existent commands",
        );
        break;
    }
  }
}
