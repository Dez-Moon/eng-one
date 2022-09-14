const ChatMessageDto = require("../dtos/chat-message-dto");
const Chat = require("../models/chat-message");
const User = require("../models/user");

class ChatService {
  async getMessages() {
    const messages = await Chat.find();
    if (!messages) {
      throw ApiError.BadRequest("Сообщений нет");
    }
    const messagesDto = [];
    for (let i = 0; i < messages.length; i++) {
      const user = await User.findById(messages[i].userId);
      const messageDto = new ChatMessageDto(messages[i], user);
      messagesDto.push(messageDto);
    }
    return messagesDto;
  }
  async sendMessage(message, userId) {
    const response = await Chat.create({
      userId: userId,
      message: message,
    });
    if (response) return true;
    else return false;
  }
  async editMessage(message, id) {
    const response = await Chat.findByIdAndUpdate(
      id,
      { message },
      { new: true }
    );
    return response;
  }
  async deleteMessage(id) {
    const response = await Chat.findByIdAndDelete(id);
    return response;
  }
  async clearMessages() {
    const response = await Chat.deleteMany();
  }
}

module.exports = new ChatService();
