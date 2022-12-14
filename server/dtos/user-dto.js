module.exports = class UserDto {
  email;
  login;
  id;
  isActivated;
  role;
  img;
  status;
  wasOnline;

  constructor(model) {
    this.email = model.email;
    this.login = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.role = model.role;
    this.img = model.img;
    this.status = model.status;
    this.wasOnline = model.wasOnline;
  }
};
