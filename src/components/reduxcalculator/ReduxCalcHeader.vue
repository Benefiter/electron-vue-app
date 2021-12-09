<template>
  <ReduxCalcOperand class="prev-operand" :value="prevOperand" />
  <ReduxCalcOperand class="operand" :value="operand" />
</template>

<script>
import ReduxCalcOperand from "../../components/reduxcalculator/ReduxCalcOperand";

export default {
  components: {
    ReduxCalcOperand,
  },
  name: "ReduxCalcHeader",
  data() {
    return {
      value: "",
    };
  },
  computed: {
    operand() {
      return this.$store.state.operand.toString();
    },
    prevOperand() {
      return this.$store.state.prevOperand.toString();
    },
  },
};
</script>

<style scoped>
.prev-operand {
  font-size: 1rem;
}

.operand {
  font-size: 1.5rem;
}
</style>
