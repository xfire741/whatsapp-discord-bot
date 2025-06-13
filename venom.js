const venom = require('venom-bot');
const axios = require('axios');
require('dotenv').config();

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

venom
  .create({
    session: 'whatsapp-session',
    useChrome: true,
    headless: true,
    args: ['--headless=new', '--no-sandbox'],
  })
  .then((client) => start(client))
  .catch((err) => console.error(err));

function start(client) {
  client.onMessage(async (message) => {
    if (message.isGroupMsg === false && message.from !== 'status@broadcast') {
      console.log(`📥 Nova mensagem de ${message.sender.pushname}: ${message.body}`);

      await axios.post(DISCORD_WEBHOOK_URL, {
        content: `📩 Mensagem de *${message.sender.pushname}*:\n${message.body}`,
      });
    }
  });
}
