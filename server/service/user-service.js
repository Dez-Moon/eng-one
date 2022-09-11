const User = require("../models/user");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const functions = require("../functions/functions");

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await User.create({
      email,
      password: hashPassword,
      role: "USER",
      activationLink,
      status: "online",
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async activate(activationLink) {
    const user = await User.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest(`Некоректная ссылка активации`);
    }
    user.isActivated = true;
    await user.save();
  }
  async login(email, password, rememberMe) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    this.setUserOnlineStatus(user, "online");
    const userDto = new UserDto(user);
    let tokens;
    if (rememberMe === "true") {
      tokens = tokenService.generateTokens({ ...userDto });
    } else {
      tokens = tokenService.generateSessionTokens({ ...userDto });
    }
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const user = await User.findById(userData.id);
    this.setUserOnlineStatus(user, "offline");
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnathorizedError();
    }
    const userData = await tokenService.validateRefreshToken(refreshToken);
    if (userData.exp - userData.iat > 2500000) {
      const tokenFromDB = await tokenService.findToken(refreshToken);
      if (!userData || !tokenFromDB) {
        throw ApiError.UnathorizedError();
      }
      const user = await User.findById(userData.id);
      this.setUserOnlineStatus(user, "online");
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return {
        ...tokens,
        user: userDto,
      };
    } else {
      throw ApiError.UnathorizedError();
    }
  }
  async getUpdateUserData(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnathorizedError();
    }
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnathorizedError();
    }
    const user = await User.findById(userData.id);
    const userDto = new UserDto(user);
    return userDto;
  }
  async setUserOnlineStatus(user, status) {
    user.status = status;
    if (status === "offline") {
      user.wasOnline = Date.now();
    } else {
      user.wasOnline = "online";
    }
    user.save();
  }
  async getPasswordRecoveryCode(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    user.passwordRecoveryCode = await functions.getRandomInt(100000, 999999);
    const response = await mailService.getPasswordRecoveryCode(
      email,
      user.passwordRecoveryCode
    );
    user.save();
  }
  async checkPasswordRecoveryCode(code) {
    const user = await User.findOne({ passwordRecoveryCode: code });
    if (!user) {
      throw ApiError.BadRequest("Код не верный");
    }
    user.passwordRecoveryCode = undefined;
    user.save();
  }
  async setPassword(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Непредвиденная ошибка");
    }
    const hashPassword = await bcrypt.hash(password, 3);
    user.password = hashPassword;
    user.save();
  }
}

module.exports = new UserService();
