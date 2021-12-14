import { DEFAULT_CHART_DATA_STATE } from "../components/chart/chart-contants";

export const state = {
  operand: "",
  prevOperand: "",
  currentOperation: "",
  currentValue: 0,
  prevValue: 0,
  resultHistory: [],
  chartData: DEFAULT_CHART_DATA_STATE,
  resultHistoryCache: [],
  cacheId: 1,
  droppedItems: [],
};
