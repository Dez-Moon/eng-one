const Test = require("../models/test");
const handleError = require("./error");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} = require("firebase/storage");
const { default: axios } = require("axios");
const tokenService = require("../service/token-service");

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

const getTest = (req, res) => {
  Test.findById(req.params.id)
    .then((test) => res.status(200).json(test))
    .catch((error) => handleError(res, error));
};
const getTests = (req, res) => {
  Test.find()
    .sort({ createdAt: -1 })
    .then((tests) => {
      res.status(200).json(tests);
    })
    .catch((error) => handleError(res, error));
};
const addTest = (req, res) => {
  const { name, questions, countQuestions, passedTest } = JSON.parse(
    req.body.test
  );
  const test = new Test({
    name,
    questions,
    countQuestions,
    passedTest,
  });
  test
    .save()
    .then((test) => res.status(200).json(test))
    .catch((error) => {
      handleError(res, error);
    });
};
const editTest = (req, res) => {
  const { name, questions } = JSON.parse(req.body.test);
  const id = req.params.id;
  Test.findByIdAndUpdate(id, { name, questions }, { new: true })
    .then((test) => res.status(200).json(test))
    .catch((error) => {
      handleError(res, error);
    });
};
const deleteTest = (req, res) => {
  const data = JSON.parse(req.params.id);
  const listRef = ref(storage, `test-image/${data.testName}`);
  listAll(listRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        const desertRef = ref(storage, itemRef["_location"]["path_"]);
        deleteObject(desertRef)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
  Test.findByIdAndDelete(data.id)
    .then((result) => {
      res.status(200).json(`Test "${data.testName}" deleted successfully`);
    })
    .catch((error) => handleError(res, error));
};
const uploadImage = function (req, res) {
  const storageRef = ref(
    storage,
    `test-image/${req.body.testName}/${req.files.image.name}`
  );
  const bytes = new Uint8Array(req.files.image.data);
  uploadBytes(storageRef, bytes).then((snapshot) => {
    res.status(200).json(snapshot.metadata.fullPath);
  });
};
const getImage = function (req, res) {
  const name = decodeURI(req.params.name).split("!-!").join("/");
  const pathReference = ref(storage, `test-image/${name}`);
  getDownloadURL(pathReference)
    .then((url) => {
      axios
        .get(url, {
          responseType: "blob",
        })
        .then((result) => {
          res.status(200).json(result.config.url);
        });
    })
    .catch((err) => console.log(err));
};
const finishedTest = async function (req, res) {
  try {
    const refreshToken = req.headers.cookies;
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const test = await Test.findById(req.params.id);
    let countAttempts = 1;
    let bestResult = req.body.correctAnswers;
    test.passedTest.forEach((user, index) => {
      if (userData.id === user.id) {
        countAttempts = user.countAttempts + 1;
        if (req.body.correctAnswers < user.bestResult) {
          bestResult = user.bestResult;
        }
        test.passedTest.splice(index, 1);
      }
    });
    const user = {
      id: userData.id,
      countAttempts: countAttempts,
      bestResult: bestResult,
    };
    test.passedTest.push(user);
    test.save();
    res.status(200).json({
      Попытка: countAttempts,
      Результат: req.body.correctAnswers,
    });
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  getTest,
  getTests,
  addTest,
  editTest,
  deleteTest,
  uploadImage,
  getImage,
  finishedTest,
};
