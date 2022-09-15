module.exports = class TestOnMainPage {
  id;
  name;
  countQuestions;
  passedTest;

  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.countQuestions = model.countQuestions;
    this.passedTest = model.passedTest;
  }
};
