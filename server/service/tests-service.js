const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const TestOnMainPage = require("../dtos/tests/tests-main-page-dto");
const Test = require("../models/test");

const firebaseConfig = {
  apiKey: "AIzaSyB9KqSRlxaFwgrlv3GWMwsA314FsjdPBNU",
  authDomain: "eng-project-b086e.firebaseapp.com",
  projectId: "eng-project-b086e",
  storageBucket: "gs://eng-project-b086e.appspot.com",
  messagingSenderId: "134035281196",
  appId: "1:134035281196:web:636d881be0c5a415a54889",
  measurementId: "G-2TCF6Q3JJT",
};
initializeApp(firebaseConfig);
const storage = getStorage();

class TestsServise {
  async getTests() {
    const tests = await Test.find().sort({ createdAt: -1 });
    const testsDto = [];
    tests.forEach((test) => {
      const testDto = new TestOnMainPage(test);
      testsDto.push(testDto);
    });
    return testsDto;
  }
  async createTest(test) {
    const response = await Test.create(test);
    console.log(response);
  }
  async uploadImage(testName, imageName, file) {
    const storageRef = ref(storage, `test-image/${testName}/${imageName}`);
    const bytes = new Uint8Array(file);
    const snapshot = await uploadBytes(storageRef, bytes);
    console.log(snapshot);
    const pathReference = ref(storage, snapshot.metadata.fullPath);
    const url = await getDownloadURL(pathReference);
    const name = snapshot.metadata.name;
    return { url, name };
  }
}

module.exports = new TestsServise();
