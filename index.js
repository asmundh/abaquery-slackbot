import SlackBot from 'slackbots';
import util from 'util';
import winston, { format } from 'winston';
import dotenv from 'dotenv';
import { getCorrespondingUsername } from './helperFunctions';

const {
  combine, timestamp, label,
} = format;

dotenv.config();

const bot = new SlackBot({
  token: process.env.BOT_TOKEN,
  name: 'Abaquery',
});

const logger = winston.createLogger({
  format: combine(
    timestamp(),
    label({ label: 'Direct message' }),
    format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: 'messages.log' }),
  ],
});

// Start handler
bot.on('start', () => {
  bot.on('message', (data) => {
    if (data.type !== 'message') {
      console.log(util.inspect(data.type));
      console.log('================================');
    } else if (data.type === 'message' && data.channel !== process.env.CHANNEL_ID) {
      logger.log({
        level: 'info',
        message: `${data.text}`,
        user: getCorrespondingUsername(bot, data.user),
      });
      bot.postMessageToChannel(
        'picksomeonetest',
        `Ny anonym melding. \n *${data.text}* \n Vet du svaret? Svar i denne tråden :pizzaparrot:`,
      );
    }
  });
});
