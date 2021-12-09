import { createStore } from "vuex";
import { cloneDeep } from "lodash";
import { operators } from "../models/calculatorButtons";

export default createStore({
  state: {
    operand: "",
    prevOperand: "",
    currentOperation: "",
    currentValue: 0,
    prevValue: 0,
    resultHistory: [],
  },
  getters: {},
  mutations: {
    setOperand(state, operand) {
      state.operand = operand;
    },
    setButtonClick(state, button) {
      const updatedState = handleButtonClick(state, button);
      state.operand = updatedState.operand;
      state.prevOperand = updatedState.prevOperand;
      state.currentOperation = updatedState.currentOperation;
      state.currentValue = updatedState.currentValue;
    },
  },
  actions: {},
  modules: {},
});

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

  return result;
};

const getPrevOperand = (prevOperand) => {
  if (prevOperand === "") return "";

  return Number(prevOperand.slice(0, prevOperand.length - 2));
};
