<script>
import SidebarLink from "./SidebarLink";
import { collapsed, toggleSidebar, sidebarWidth } from "./state";

export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth };
  },
  methods: {
    clearHistory() {
      this.$store.commit("clearHistory");
    },
  },
  computed: {
    hasHistory() {
      return this.$store.state.resultHistoryCache?.length > 0;
    },
  },
};
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <div v-show="!collapsed" class="divider" />
    <SidebarLink to="/appointmentworkflow" icon="fas fa-columns"
      >Appointments</SidebarLink
    >
    <div v-show="!collapsed" class="divider" />

    <SidebarLink to="/calculator" icon="fas fa-chart-bar"
      >Vuex Calculator</SidebarLink
    >
    <div
      @click="clearHistory"
      v-show="!collapsed && hasHistory"
      class="subitem"
    >
      Clear History
    </div>
    <div v-show="!collapsed" class="divider" />

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}
</style>

<style scoped>
.divider {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 1px;
  background-color: #ccc;
  border: none;
}
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}

.subitem {
  width: max-content;
  margin-left: 40px;
  font-size: 0.75rem;
}
.subitem:hover {
  background-color: var(--sidebar-item-hover);
  transition: 0.3s ease;
}
</style>
