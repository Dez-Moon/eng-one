const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    questions: [
      {
        name: {
          type: String,
          required: true,
        },
        img: {
          type: String,
        },
        answerVariants: [
          {
            answer: {
              type: String,
              required: true,
            },
            answerCorrect: {
              type: Boolean,
              required: true,
            },
          },
        ],
      },
    ],
    countQuestions: {
      type: Number,
      required: true,
    },
    passedTest: [
      {
        id: {
          type: String,
          required: true,
        },
        countAttempts: {
          type: Number,
          required: true,
        },
        bestResult: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
