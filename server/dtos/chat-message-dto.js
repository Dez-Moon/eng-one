module.exports = class ChatMessageDto {
  message;
  id;
  userId;
  createdAt;
  updatedAt;

  constructor(model) {
    this.message = model.message;
    this.id = model._id;
    this.userId = model.userId;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
};
