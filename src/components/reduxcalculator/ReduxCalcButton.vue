<template>
  <button class="calc-button" @click="onClick()">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: String,
  },
  name: "ReduxCalcButton",
  methods: {
    onClick() {
      this.$store.commit("setButtonClick", this.text);
      this.$emit("btn-click");
    },
  },
};
</script>

<style scoped>
.calc-button {
  background-color: rgb(179, 236, 247);
  cursor: pointer;
  font-size: 1.5rem;
  border: 1px solid white;
  outline: none;
  width: 100%;
  height: 100%;
}

.calc-button:hover {
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
