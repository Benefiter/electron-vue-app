<template>
  <div class="operand-value">{{ value }}</div>
</template>

<script>
export default {
  props: {
    value: Number,
  },
  name: "ReduxCalcOperand",
};
</script>

<style scoped>
.operand-value {
  color: white;
}
</style>
