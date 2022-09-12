module.exports = class ChatMessageDto {
  message;
  id;
  user;
  createdAt;
  updatedAt;

  constructor(message, user) {
    this.message = message.message;
    this.id = message._id;
    this.createdAt = message.createdAt;
    this.updatedAt = message.updatedAt;
    this.user = {
      id: user._id,
      login: user.login,
      img: user.img,
      status: user.status,
    };
  }
};
