import { createStore } from "vuex";
import { cloneDeep, isEqual } from "lodash";
import { operators } from "../models/calculatorButtons";
import {
  DEFAULT_CHART_DATA_STATE,
  ChartLineColors,
} from "../components/chart/chart-contants";

export default createStore({
  state: {
    operand: "",
    prevOperand: "",
    currentOperation: "",
    currentValue: 0,
    prevValue: 0,
    resultHistory: [],
    chartData: DEFAULT_CHART_DATA_STATE,
    resultHistoryCache: [],
    cacheId: 1,
  },
  getters: {},
  mutations: {
    setOperand(state, operand) {
      state.operand = operand;
    },
    setButtonClick(state, button) {
      const updatedState = handleButtonClick(state, button);
      if (!isEqual(state.operand, updatedState.operand))
        state.operand = updatedState.operand;
      if (!isEqual(state.prevOperand, updatedState.prevOperand))
        state.prevOperand = updatedState.prevOperand;
      if (!isEqual(state.currentOperation, updatedState.currentOperation))
        state.currentOperation = updatedState.currentOperation;
      if (!isEqual(state.currentValue, updatedState.currentValue))
        state.currentValue = updatedState.currentValue;
      if (!isEqual(state.resultHistory, updatedState.resultHistory))
        state.resultHistory = updatedState.resultHistory;
      if (!isEqual(state.chartData, updatedState.chartData))
        state.chartData = updatedState.chartData;
    },
    cacheResultHistory(state) {
      state.resultHistoryCache = updateResultHistoryCache(state);
      state.cacheId = state.cacheId + 1;
      state.resultHistory = [];
      state.chartData.datasets[0].data = [];
    },
    clearChart(state) {
      state.resultHistory = [];
      state.chartData.datasets = [...DEFAULT_CHART_DATA_STATE.datasets];
    },
    addLineToChart(state, id) {
      const item = state.resultHistoryCache.find((c) => c.id == id);
      if (item == null) return;

      let chartData = state.chartData;
      chartData.datasets.push({
        label: id,
        backgroundColor: ChartLineColors[chartData.datasets.length],
        data: item.resultHistory.map((r) => ({ x: r.timestamp, y: r.value })),
      });

      state.chartData = cloneDeep(chartData);
    },
  },
  actions: {},
  modules: {},
});

const updateResultHistoryCache = (state) => {
  const cacheResultHistory = cloneDeep(state.resultHistoryCache);
  const resultHistory = cloneDeep(state.resultHistory);
  cacheResultHistory.push({ id: state.cacheId, resultHistory });

  return cacheResultHistory;
};

const handleButtonClick = (state, button) => {
  let updatedState = cloneDeep(state);
  handleCalcButtonOperationEmit(updatedState, button);
  return { ...updatedState, button };
};

const handleCalcButtonOperationEmit = (state, button) => {
  switch (button) {
    case "AC":
      handleACButton(state);
      break;
    case "Del":
      handleDELButton(state);
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      state.operand += button;
      break;
    case ".":
      if (state.operand.includes(".")) break;
      state.operand += button;
      break;
    case "0":
      if (state.operand === "0") break;
      state.operand += button;
      break;
    case "+":
    case "*":
    case "-":
    case "/":
      handleOperationButton(state, button);
      break;
    case "=":
      handleExecuteButton(state);
      break;
  }
};

const handleACButton = (state) => {
  state.operand = "";
  state.prevOperand = "";
  state.currentOperation = "";
};

const handleDELButton = (state) => {
  if (state.operand === "") {
    if (
      state.prevOperand !== "" &&
      operators.includes(state.prevOperand.slice(-1))
    ) {
      state.currentOperation = "";
      state.operand = getPrevOperand(state.prevOperand).toString();
      state.prevOperand = "";
    }
    return;
  }
  state.operand = state.operand.slice(0, -1);
};

const handleOperationButton = (state, operation) => {
  if (
    (state.operand === "" && state.prevOperand === "") ||
    state.operand === ""
  )
    return;

  if (state.currentOperation !== "") {
    execute(state);
    state.prevOperand = `${state.operand} ${operation}`;
    state.currentValue = Number(state.operand);
    state.operand = "";
    state.currentOperation = operation;
    return;
  }
  state.currentOperation = operation;
  state.prevOperand = `${state.operand} ${operation}`;
  state.operand = "";
};

const handleExecuteButton = (state) => {
  if (state.prevOperand === "" || state.operand === "") return;
  execute(state);
  state.prevOperand = "";
  state.currentOperation = "";
  state.currentValue = Number(state.operand);
};

const execute = (state) => {
  const { currentOperation, operand, prevOperand } = state;

  const theOperand = Number(operand);
  let result;
  switch (currentOperation) {
    case "+":
      result = Number(getPrevOperand(prevOperand)) + theOperand;
      break;
    case "*":
      result = Number(getPrevOperand(prevOperand)) * theOperand;
      break;
    case "-":
      result = Number(getPrevOperand(prevOperand)) - theOperand;
      break;
    case "/":
      result = Number(getPrevOperand(prevOperand)) / theOperand;
      break;
    default:
    // Should never happen...
  }

  if (!result) return Number.NaN;

  state.operand = result.toString();
  state.resultHistory = [
    ...state.resultHistory,
    { timestamp: new Date().toISOString().toString(), value: result },
  ];
  state.chartData = getChartData(state);

  return result;
};

const getChartData = (state) => {
  if (state == null || state.resultHistory == null) return;

  const chartData = state.resultHistory.map((sample) => ({
    x: sample.timestamp,
    y: sample.value.toString(),
  }));

  return {
    ...state.chartData,
    datasets: [
      {
        ...state.chartData.datasets[0],
        data: [...chartData],
      },
    ],
  };
};
const getPrevOperand = (prevOperand) => {
  if (prevOperand === "") return "";

  return Number(prevOperand.slice(0, prevOperand.length - 2));
};
