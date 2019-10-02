import { Botkit } from 'botkit';
import dotenv from 'dotenv';
import { SlackAdapter } from 'botbuilder-adapter-slack';


dotenv.config();

if (!process.env.CLIENT_ID
  || !process.env.CLIENT_SECRET
  || !process.env.PORT
  || !process.env.VERIFICATION_TOKEN) {
  console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment');
  process.exit(1);
} else {
  console.log('Good job, you have the variables!');
}

const adapter = new SlackAdapter({
  clientSigningSecret: process.env.CLIENT_SECRET,
  botToken: process.env.BOT_TOKEN,
});

const controller = new Botkit({
  adapter,
  debug: true,
  storage: './log.txt',
});

controller.on('message', async (bot, message) => {
  await bot.reply(message, 'I heard something!');
});


// controller.hears('hello', 'direct_message', (bot, message) => {
//   bot.reply(message, 'Hello yourself');
// });

// // controller.configureSlackApp({
// //   clientId: process.env.CLIENT_ID,
// //   clientSecret: process.env.CLIENT_SECRET,
// //   clientSigningSecret: process.env.CLIENT_SIGNING_SECRET,
// //   scopes: ['commands', 'bot'],
// // });

// const bot = controller.spawn({
//   token: process.env.BOT_TOKEN,
//   incoming_webhook: {
//     url: 'WE_WILL_GET_TO_THIS',
//   },
// });
