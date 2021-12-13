import { mount } from "@vue/test-utils";
import Historyitem from "@/components/chart/history/Historyitem";
import Vuex from "vuex";
import { cloneDeep } from "lodash";

const mutations = { removeFromChart: jest.fn() };
const state = {
  droppedItems: [],
};
let store;

beforeEach(() => {
  store = new Vuex.Store({
    state,
    mutations,
  });
});

afterEach(() => {
  store = new Vuex.Store({
    state,
    mutations,
  });
});

const getSut = (store, itemId) => {
  return mount(Historyitem, {
    data() {
      return {
        dragging: false,
      };
    },
    propsData: {
      id: itemId,
      text: "title",
      margin: "10px",
    },
    global: {
      mocks: {
        $store: store,
      },
    },
  });
};

test("Historyitem opacity is diminished when on chart", () => {
  const testStore = cloneDeep(store);
  const itemId = "1";
  testStore.state.droppedItems.push(itemId);
  const sut = getSut(testStore, itemId);
  const div = sut.findAll("div").at(0);
  expect(div.element.style.opacity).toBe("0.25");
});

test("removeFromChart mutation is called when item is double clicked", () => {
  const testStore = cloneDeep(store);
  const itemId = "1";
  testStore.state.droppedItems.push(itemId);
  const sut = getSut(testStore, itemId);
  const div = sut.findAll("div").at(0);
  div.trigger("dblclick");

  expect(mutations.removeFromChart).toBeCalledTimes(1);
});

test("item is draggable if not already on chart", () => {
  const testStore = cloneDeep(store);
  const itemId = "1";
  const sut = getSut(testStore, itemId);
  const div = sut.findAll("div").at(0);
  expect(div.element.draggable).toBeTruthy();
});

test("item is not draggable if already on chart", () => {
  const testStore = cloneDeep(store);
  const itemId = "1";
  testStore.state.droppedItems.push(itemId);
  const sut = getSut(testStore, itemId);
  const div = sut.findAll("div").at(0);
  expect(div.element.draggable).toBeFalsy();
});

test("dragging item changes its opacity", () => {
  const testStore = cloneDeep(store);
  const itemId = "1";
  const sut = getSut(testStore, itemId);

  const div = sut.findAll("div").at(0);
  div.trigger("dragstart");

  expect(sut.vm.getStyle.opacity).toBe("0.25");
});

test("drag start following by drag end reverts opacity", () => {
  const testStore = cloneDeep(store);
  const itemId = "1";
  const sut = getSut(testStore, itemId);

  const div = sut.findAll("div").at(0);
  div.trigger("dragstart");
  div.trigger("dragend");

  expect(sut.vm.getStyle.opacity).toBe("inherit");
});
