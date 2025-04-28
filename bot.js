const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()

// Replace 'YOUR_BOT_TOKEN' with your bot's API token
const token = process.env.BOT_TOKEN;
// Replace 'YOUR_WEBHOOK_URL' with your public HTTPS URL (e.g., https://your-domain.com or ngrok URL)
const webhookUrl = process.env.WEBHOOK_URL;

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Create a bot instance with polling disabled
const bot = new TelegramBot(token, { polling: false });

// Set the webhook
const webhookPath = '/webhook'; // Simpler webhook path
bot.setWebHook(`${webhookUrl}${webhookPath}`)
  .then(() => {
    console.log('Webhook set successfully');
  })
  .catch((error) => {
    console.error('Error setting webhook:', error);
  });

// Handle the /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Define the inline keyboard
  const keyboard = {
    inline_keyboard: [
      [
        { text: 'Option 1', callback_data: '1' },
        { text: 'Option 2', callback_data: '2' },
      ],
    ],
  };

  // Send a message with the inline keyboard
  bot.sendMessage(chatId, 'Please choose an option:', {
    reply_markup: keyboard,
  });
});

// Handle button callbacks
bot.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  const choice = callbackQuery.data;

  // Acknowledge the callback query
  bot.answerCallbackQuery(callbackQuery.id);

  // Respond to the user
  bot.sendMessage(msg.chat.id, `You selected Option ${choice}!`);
});

// Express route to handle webhook updates
app.post(webhookPath, (req, res) => {
  try {
    console.log('Received webhook update:', JSON.stringify(req.body, null, 2));
    
    // Check if the update has the required structure
    if (!req.body || !req.body.message && !req.body.callback_query) {
      console.log('Invalid update format received');
      return res.sendStatus(200); // Still return 200 to prevent Telegram from retrying
    }

    bot.processUpdate(req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error processing update:', error);
    res.sendStatus(500);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Webhook set to ${webhookUrl}${webhookPath}`);
});