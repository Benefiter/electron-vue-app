<template>
  <span>
    <input
      type="checkbox"
      @click="handleClick"
      v-model="completed"
      name="reminder"
      :checked="reminder"
      class="hover-style"
    />
  </span>
</template>

<script>
export default {
  name: "Checkbox",
  data() {
    return {
      reminder: this.checked,
    };
  },
  props: {
    checked: {
      type: Boolean,
    },
  },
  methods: {
    handleClick(value) {
      this.reminder = value.target.checked;
      this.$emit("filterChanged", this.reminder);
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
