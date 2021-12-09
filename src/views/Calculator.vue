<template>
  <div class="calc-container">
    <div class="calc-header">
      <ReduxCalcHeader />
    </div>
    <div
      :class="button.className"
      :key="button.buttonName"
      v-for="button in calculatorButtons"
    >
      <ReduxCalcButton :text="button.buttonName" />
    </div>
  </div>
</template>

<script>
import {
  operators,
  CalculatorButtonContext,
} from "../models/calculatorButtons";
import ReduxCalcHeader from "../components/reduxcalculator/ReduxCalcHeader";
import ReduxCalcButton from "../components/reduxcalculator/ReduxCalcButton";

export default {
  components: {
    ReduxCalcHeader,
    ReduxCalcButton,
  },
  name: "Calculator",
  data() {
    return {
      currentValue: 0,
      operators: operators,
      calculatorButtons: CalculatorButtonContext,
      chartsamples: [],
      appHistoryExists: false,
    };
  },
  computed: {
    operand() {
      return this.$store.state.operand;
    },
    prevOperand() {
      return this.$store.state.prevOperand;
    },
  },
};
</script>

<style scoped>
.calc-container {
  display: grid;
  justify-content: center;
  align-content: center;
  grid-template-columns: repeat(4, 50px);
  grid-template-rows: minmax(100px, auto) repeat(5, 50px);
}

.calc-header {
  grid-column: 1 / -1;
  background-color: rgba(0, 46, 44, 0.75);
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  flex-direction: column;
  padding: 10px;
  word-wrap: break-word;
  word-break: break-all;
}

.span-two {
  grid-column: span 2;
}

.chart {
  margin: auto;
  width: 400px;
  padding-bottom: 40px;
}

.history-items {
  margin: auto;
  width: 400px;
  padding-bottom: 40px;
}

.content-style {
  display: flex;
  flex-direction: column;
}
</style>
