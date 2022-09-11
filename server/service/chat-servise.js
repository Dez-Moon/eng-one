const Chat = require("../models/chat-message");

class ChatService {
  async getMessages() {
    const messages = await Chat.find().sort({ createdAt: -1 });
    if (!messages) {
      throw ApiError.BadRequest("Сообщений нет");
    }
    return messages;
  }
  async sendMessage(message, userId) {
    const response = await Chat.create({
      userId: userId,
      message: message,
    });
    if (response) return true;
    else return false;
  }
  async changeMessage(message, id) {}
  async deleteMessage(id) {}
}

module.exports = new ChatService();
