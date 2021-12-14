<template>
  <div class="chart-container clearfix">
    <Icon
      class="left"
      title="Reset trend"
      icon="clear"
      color="black"
      @click="clearChart"
      v-show="!hidden"
    ></Icon>
    <Icon
      class="left"
      title="Cache trend data"
      icon="save"
      color="black"
      v-show="!hidden && hasSamples"
      @click="cacheTrend"
    ></Icon>
    <span
      class="collapsed"
      :style="{ display: hidden ? 'inline-block' : 'none' }"
      >Calculator value trend</span
    >
    <Icon
      class="right"
      title="Show trend"
      icon="expand"
      color="black"
      v-show="hidden"
      @click="toggleHidden"
    ></Icon>
    <Icon
      class="right"
      title="Hide trend"
      icon="collapse"
      color="black"
      v-show="!hidden"
      @click="toggleHidden"
    ></Icon>
    <div
      :style="{ display: hidden ? 'none' : 'block' }"
      @drop="onDrop($event)"
      @dragover.prevent
      @dragenter.prevent
    >
      <canvas id="calc-chart"></canvas>
    </div>
  </div>
</template>

<script>
import Icon from "../icon";
import { Chart, registerables } from "chart.js";
import { cloneDeep } from "lodash";
import { CHART_OPTIONS, MAX_CHART_LINES } from "./chart-contants";
import "chartjs-adapter-moment";

export default {
  name: "Chart",
  data() {
    return {
      hidden: false,
      mounted: false,
    };
  },
  mounted() {
    // Required to prevent unit testing errors
    if (Symbol.iterator in Object(registerables)) {
      Chart.register(...registerables);
      this.ctx = document.getElementById("calc-chart").getContext("2d");
    }
    this.mounted = true;
  },
  computed: {
    maxChartedLines() {
      return this.$store.state.chartData?.datasets?.length > MAX_CHART_LINES;
    },
    hasSamples() {
      if (!this.mounted) return null;

      if (Symbol.iterator in Object(registerables)) {
        Chart.getChart(this.ctx)?.destroy();

        new Chart(this.ctx, {
          type: "line",
          data: cloneDeep(this.$store.state.chartData),
          options: cloneDeep(CHART_OPTIONS),
        });
      }

      return this.$store.state.chartData?.datasets[0]?.data?.length > 0;
    },
  },
  components: {
    Icon,
  },
  methods: {
    onDrop(event) {
      event.preventDefault();
      const itemId = event.dataTransfer.getData("itemId");
      if (this.$store.state.droppedItems.includes(itemId)) return;

      this.maxChartedLines
        ? alert("Maximum number of lines have been added")
        : this.$store.commit("addLineToChart", itemId);
    },
    clearChart() {
      this.$store.commit("clearChart");
    },
    cacheTrend() {
      this.$store.commit("cacheResultHistory");
    },
    toggleHidden() {
      this.hidden = !this.hidden;
    },
  },
};
</script>
<style scoped>
.chart-container {
  border: 1px solid rgba(208, 212, 212, 0.8);
  padding: 10px;
  box-shadow: 10px 10px 8px #888888;
}

.collapsed {
  display: inline-block;
  text-align: center;
  opacity: 50%;
  width: 80%;
}

.icon:hover {
  background-color: aquamarine;
}

.right {
  float: right;
}
.left {
  float: left;
}
.clearfix {
  overflow: auto;
}
</style>
