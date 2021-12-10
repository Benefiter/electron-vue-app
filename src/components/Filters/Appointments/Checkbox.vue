<template>
  <span>
    <input
      type="checkbox"
      @click="handleClick"
      v-model="completed"
      name="cbState"
      :checked="cbState"
      class="hover-style"
    />
  </span>
</template>

<script>
export default {
  name: "Checkbox",
  data() {
    return {
      cbState: this.checked,
    };
  },
  props: {
    checked: {
      type: Boolean,
    },
  },
  methods: {
    handleClick(value) {
      this.cbState = value.target.checked;
      this.$emit("cbChanged", this.cbState);
    },
  },
};
</script>
<style scoped>
.label {
  padding-right: 10px;
}

.hover-style:hover {
  outline: 2px solid yellowgreen;
}
</style>
