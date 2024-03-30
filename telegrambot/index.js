const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

// Thay thế 'YOUR_TELEGRAM_BOT_TOKEN' với token của bot Telegram của bạn
const token = "6634003260:AAHVwkmsK4H0JX0UEmdHsm2WqoIMKx2nLog";
const bot = new TelegramBot(token, { polling: true });

// URL của Web App của bạn
const webAppUrl = "https://kenh14.vn";

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;

  console.log(`Nguoi dung: ${username}`);
  try {
    // Thực hiện yêu cầu đến server
    await axios.post("http://localhost:3000/api/telegram", {
      username: username,
    });

    // Nếu yêu cầu thành công, gửi tin nhắn với nút mở Web App
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Mở App",
              web_app: { url: webAppUrl },
            },
          ],
        ],
      },
    };
    bot.sendMessage(chatId, "Nhấn vào nút dưới đây để mở Web App:", opts);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, "Đã xảy ra lỗi khi tạo tài khoản.");
  }
});
