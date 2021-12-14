import { mount } from "@vue/test-utils";
import ReduxCalcButton from "@/components/reduxcalculator/ReduxCalcButton";
import { state } from "@/store/state";
import { mutations } from "@/store/mutations";
import Vuex from "vuex";

let sut;
let button;
const calcButtonNumber = "1";
const calcButtonOperator = "+";

let store;

beforeEach(() => {
  store = new Vuex.Store({
    state,
    mutations,
  });
});

test("Number button click commits to store correctly and fires custom event", async () => {
  sut = mount(ReduxCalcButton, {
    propsData: {
      text: calcButtonNumber,
    },
    global: {
      mocks: {
        $store: store,
      },
    },
  });

  button = sut.find("button");
  expect(sut.exists()).toBeTruthy();
  expect(button.exists()).toBeTruthy();
  await button.trigger("click");
  const emitted = sut.emitted("btn-click");
  expect(emitted.length).toBe(1);
  expect(store.state.operand).toEqual(calcButtonNumber);
  await button.trigger("click");
  expect(store.state.operand).toEqual(calcButtonNumber + calcButtonNumber);
});

test("Operator button click commites to correctly store and fires custom event", async () => {
  sut = mount(ReduxCalcButton, {
    propsData: {
      text: calcButtonOperator,
    },
    global: {
      mocks: {
        $store: store,
      },
    },
  });

  button = sut.find("button");
  expect(sut.exists()).toBeTruthy();
  expect(button.exists()).toBeTruthy();
  await button.trigger("click");
  const emitted = sut.emitted("btn-click");
  expect(emitted.length).toBe(1);
  expect(store.state.currentOperation).toEqual(calcButtonOperator);
  await button.trigger("click");
  expect(store.state.currentOperation).toEqual(calcButtonOperator);
});
