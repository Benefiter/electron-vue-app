<template>
  <div class="operand-value">{{ value }}</div>
</template>

<script>
export default {
  props: {
    value: String,
  },
  name: "ReduxCalcOperand",
};
</script>

<style scoped>
.operand-value {
  color: white;
}
</style>
