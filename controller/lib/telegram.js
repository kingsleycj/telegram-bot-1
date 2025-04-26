const { getAxiosInstance } = require("./axios");
const { errorHandler } = require("./helper");
require("dotenv").config();

const TOKEN = process.env.BOT_TOKEN;
const BASE_URL = `https://api.telegram.org/bot${TOKEN}`;
const axiosInstance = getAxiosInstance(BASE_URL);

async function sendMessage(chatId, messageText) {
  return axiosInstance
    .get("sendMessage", {
      chat_id: chatId || MY_GROUP_CHAT_ID,
      text: messageText,
    })
    .catch((err) => {
      errorHandler(err, "sendMessage", "axios");
    });
}

async function handleMessage(messageObj) {
  const messageText = messageObj.text || "";
  if (!messageText) {
    errorHandler("No message text", "handleMessage");
    return "";
  }

  try {
    const chatId = messageObj.chat.id;
    if (messageText.charAt(0) === "/") {
      const command = messageText.substr(1);
      switch (command) {
        case "start":
          // we want to send a welcome message to the user.
          return sendMessage(
            chatId,
            `Hello, I'm Kingsley's bot, i can helo me learn about tlegram`
          );
        default:
          return sendMessage(
            chatId,
            `hey ${first_name}, i dont know that command`
          );
      }
    } else {
      return sendMessage(chatId, messageText);
    }
  } catch (error) {
    errorHandler(error, "handleMessage");
  }
}

module.exports = { sendMessage, handleMessage };
