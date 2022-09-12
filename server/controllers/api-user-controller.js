const User = require("../models/user");
const Chat = require("../models/chat-message");
const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const { initializeApp } = require("firebase/app");
const tokenService = require("../service/token-service");
const { default: axios } = require("axios");
const UserDto = require("../dtos/user-dto");
const ChatMessageDto = require("../dtos/chat-message-dto");

const firebaseConfig = {
  apiKey: "AIzaSyB9KqSRlxaFwgrlv3GWMwsA314FsjdPBNU",
  authDomain: "eng-project-b086e.firebaseapp.com",
  projectId: "eng-project-b086e",
  storageBucket: "gs://eng-project-b086e.appspot.com",
  messagingSenderId: "134035281196",
  appId: "1:134035281196:web:636d881be0c5a415a54889",
  measurementId: "G-2TCF6Q3JJT",
};

const fireBaseApp = initializeApp(firebaseConfig);
const storage = getStorage();

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }
      console.log(req.body);
      const { email, login, password } = req.body;
      const userData = await userService.registration(email, login, password);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password, rememberMe } = req.body;
      const userData = await userService.login(email, password, rememberMe);
      if (rememberMe === "true") {
        userData.rememberMe = true;
      }
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const refreshToken = req.headers.cookies;
      const token = await userService.logout(refreshToken);
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const refreshToken = req.headers.cookies;
      const userData = await userService.refresh(refreshToken);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async getUpdateUserData(req, res, next) {
    try {
      const refreshToken = req.headers.cookies;
      const userData = await userService.getUpdateUserData(refreshToken);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async changeUserPhoto(req, res, next) {
    try {
      const refreshToken = req.headers.cookies;
      const userData = await tokenService.validateRefreshToken(refreshToken);
      const user = await User.findById(userData.id);
      const storageRef = ref(storage, `users-photo/${userData.id}.jpeg`);
      const bytes = new Uint8Array(req.files.photo.data);
      const response = await uploadBytes(storageRef, bytes);
      const pathReference = ref(storage, `${response.metadata.fullPath}`);
      const url = await getDownloadURL(pathReference);
      const response2 = await axios.get(url, { responseType: "blob" });
      user.img = response2.config.url;
      console.log(user);
      user.save();
      res.status(200).json(response2.config.url);
    } catch (e) {
      next(e);
    }
  }
  async getUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      const userDto = new UserDto(user);
      res.status(200).json(userDto);
    } catch (e) {
      next(e);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      const usersDto = [];
      users.forEach((user) => {
        const userDto = new UserDto(user);
        usersDto.push(userDto);
      });
      res.status(200).json(usersDto);
    } catch (e) {
      next(e);
    }
  }
  async userOffline(req, res, next) {
    try {
      const refreshToken = req.headers.cookies;
      const userData = await tokenService.validateRefreshToken(refreshToken);
      const user = await User.findById(userData.id);
      userService.setUserOnlineStatus(user, "offline");
      res.status(200).json("offline");
    } catch (e) {
      next(e);
    }
  }
  async getPasswordRecoveryCode(req, res, next) {
    try {
      const { email } = req.body;
      const response = await userService.getPasswordRecoveryCode(email);
      res.status(200).json();
    } catch (e) {
      next(e);
    }
  }
  async checkPasswordRecoveryCode(req, res, next) {
    try {
      const { code } = req.body;
      const response = await userService.checkPasswordRecoveryCode(code);
      res.status(200).json();
    } catch (e) {
      next(e);
    }
  }
  async setPassword(req, res, next) {
    try {
      const { email, password } = req.body;
      const response = await userService.setPassword(email, password);
      res.status(200).json();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
