import { mount } from "@vue/test-utils";
import Historyitems from "@/components/chart/history/Historyitems";
import Historyitem from "@/components/chart/history/Historyitem";
import Icon from "@/components/Icon";
import Vuex from "vuex";
import { cloneDeep } from "lodash";
import moment from "moment";

const mutations = { removeFromChart: jest.fn() };
const state = {
  droppedItems: [],
  resultHistoryCache: [],
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

const getSut = (store) => {
  return mount(Historyitems, {
    data() {
      return {
        dragging: false,
      };
    },
    global: {
      mocks: {
        $store: store,
      },
    },
  });
};

test("Historyitems container is hidden when no cached history items in store", () => {
  const testStore = cloneDeep(store);
  const sut = getSut(testStore);
  const div = sut.find(".history-items-container");
  expect(div).toBeDefined();
  expect(div.element.style.display).toBe("none");
  expect(sut.vm.hidden).toBeTruthy;
});

test("Historyitems container contains no Historyitem components when no cached history items in store", () => {
  const testStore = cloneDeep(store);
  const sut = getSut(testStore);
  expect(sut.findComponent(Historyitem).exists()).toBe(false);
});

test("Historyitems container is visible when at least one history item in store", () => {
  const testStore = cloneDeep(store);
  testStore.state.resultHistoryCache.push({
    id: 1,
    resultHistory: [
      { timestamp: new moment(), value: 1 },
      { timestamp: new moment(), value: 2 },
    ],
  });
  const sut = getSut(testStore);
  const div = sut.find(".history-items-container");
  expect(div).toBeDefined();
  expect(div.element.style.display).toBe("");
  expect(sut.vm.hidden).toBeFalsy;
});

test("Historyitems container has Historyitem component when history item in store", () => {
  const testStore = cloneDeep(store);
  testStore.state.resultHistoryCache.push({
    id: 1,
    resultHistory: [
      { timestamp: new moment(), value: 1 },
      { timestamp: new moment(), value: 2 },
    ],
  });
  const sut = getSut(testStore);
  expect(sut.findAllComponents(Historyitem).length).toBe(1);
  expect(sut.findComponent(Historyitem).exists()).toBe(true);
});

test("Historyitems container has Hide history icon when history item in store", () => {
  const testStore = cloneDeep(store);
  testStore.state.resultHistoryCache.push({
    id: 1,
    resultHistory: [
      { timestamp: new moment(), value: 1 },
      { timestamp: new moment(), value: 2 },
    ],
  });
  const sut = getSut(testStore);
  const icons = sut.findAllComponents(Icon);
  const sutIcon = icons.find((i) => {
    return i.element.style.display === "none";
  });
  expect(sutIcon).toBeDefined();
  expect(sutIcon.props("icon")).toBe("collapse");
});

test("Historyitems container shows expand icon when collapse icon is clicked", () => {
  const testStore = cloneDeep(store);
  testStore.state.resultHistoryCache.push({
    id: 1,
    resultHistory: [
      { timestamp: new moment(), value: 1 },
      { timestamp: new moment(), value: 2 },
    ],
  });
  const sut = getSut(testStore);
  const icons = sut.findAllComponents(Icon);
  const sutCollapseIcon = icons.find((i) => {
    return i.props("icon") === "expand";
  });
  expect(sutCollapseIcon).toBeDefined();
  sutCollapseIcon.trigger("click");
  const sutExpandIcon = icons.find((i) => {
    return i.props("icon") === "collapse";
  });
  expect(sutExpandIcon).toBeDefined();
  expect(sutExpandIcon.element.style.display).toBe("none");
});
