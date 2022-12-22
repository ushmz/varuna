import Task1Page1 from "./1_p1.json";
import Task1Page2 from "./1_p2.json";
import Task1Page3 from "./1_p3.json";
import Task1Page4 from "./1_p4.json";
import Task2Page1 from "./2_p1.json";
import Task2Page2 from "./2_p2.json";
import Task2Page3 from "./2_p3.json";
import Task2Page4 from "./2_p4.json";

export const getSearchPageFixture = (taskID: number, page: number) => {
  if (taskID === 1) {
    if (page === 1) {
      return Task1Page1.data;
    } else if (page === 2) {
      return Task1Page2.data;
    } else if (page === 3) {
      return Task1Page3.data;
    } else {
      return Task1Page4.data;
    }
  } else if (taskID === 2) {
    if (page === 1) {
      return Task2Page1.data;
    } else if (page === 2) {
      return Task2Page2.data;
    } else if (page === 3) {
      return Task2Page3.data;
    } else {
      return Task2Page4.data;
    }
  } else {
    return [];
  }
};
