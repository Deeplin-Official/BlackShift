import { Client } from 'discord.js';

const discordClient = new Client();

discordClient.on('message', message => {
  if (message.author.bot) return;

  if (message.content.substr(0, 1) !== prefix) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');

  const command = args.shift()?.toLowerCase();

  if (command !== 'ctos') return;

  if (command?.toLocaleLowerCase() === 'ctos') {
    switch (args[0]) {
      case 'ping':
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
        break;

      case 'hello':
        message.reply(`Hello ${message.author.username}, how are you ???`);
        break;

      case 'help':
        message.reply(`Command List: \n - ping \n - hello \n - help`);
        break;

      default:
        message.reply(
          "Oooh, i can't understand that command please do 'help' to list all existent commands",
        );
        break;
    }
  }
});
