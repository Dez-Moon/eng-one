import { TestsOnMainPageType } from "./../components/Tests/components/TestsMain/TestsMain";
import { AxiosResponse } from "axios";
import { $api } from "./api-settings";
import { CreatingAndPassingTestType } from "../components/Tests/components/TestСreation/TestCreation";

export const testsApi = {
  getTests(): Promise<AxiosResponse<Array<TestsOnMainPageType>>> {
    const promise = $api.get<Array<TestsOnMainPageType>>("tests");
    return promise;
  },
  getTest(id: string): Promise<AxiosResponse<CreatingAndPassingTestType>> {
    const promise = $api.get<CreatingAndPassingTestType>(`test/${id}`);
    return promise;
  },
  getTestForPass(
    id: string
  ): Promise<AxiosResponse<CreatingAndPassingTestType>> {
    const promise = $api.get<CreatingAndPassingTestType>(`pass-test/${id}`);
    return promise;
  },
  async createTest(test: CreatingAndPassingTestType) {
    const promises = [] as any;
    test.questions.forEach((question) => {
      if (question.img.name) {
        const promise = this.uploadFile(question.img, test.name);
        promises.push(promise);
      }
    });
    const responseAll = await Promise.all(promises);
    console.log(responseAll);

    responseAll.forEach((response, index) => {
      for (let i = 0; i < test.questions.length; i++) {
        if (test.questions[i].img.name === response.data.name) {
          test.questions[i].img = response.data.url;
          break;
        }
      }
    });
    const body = new URLSearchParams();
    body.append("test", JSON.stringify(test));
    const promise = $api.post<CreatingAndPassingTestType>(`create-test`, body);
    return promise;
  },
  uploadFile(img: any, testName: string) {
    let formData = new FormData();
    formData.append("image", img);
    formData.append("testName", testName);
    const promise = $api.post(`test-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }) as any;
    return promise;
  },
  addTest(test: any) {
    const params = new URLSearchParams();
    params.append("test", JSON.stringify(test));
    const promise = $api.post("test", params) as any;
    return promise;
  },
  updateTest(test: any) {
    const params = new URLSearchParams();
    params.append("test", JSON.stringify(test));
    const promise = $api.put(`test/${test["_id"]}`, params) as any;
    return promise;
  },
  deleteTest(id: string, testName: string) {
    const data = {
      id,
      testName,
    };
    const promise = $api.delete(`test/${JSON.stringify(data)}`) as any;
    return promise;
  },
  getImage(name: string) {
    let nameArray = name.split("/");
    nameArray.splice(0, 1);
    let newName = nameArray.join("!-!");
    const url = encodeURI(newName);
    const promise = $api.get(`test-image/${url}`) as any;
    return promise;
  },
  finishedTest(testId: string, correctAnswers: string) {
    const params = new URLSearchParams();
    params.append("correctAnswers", correctAnswers);
    const promise = $api.put(`finishTest/${testId}`, params);
    return promise;
  },
};
