<template>
  <div class="history-items-container clearfix" v-show="!hidden">
    <span class="title"> Calculator History </span>
    <span class="collapse-icon">
      <Icon
        title="Show history"
        icon="expand"
        color="black"
        @click="toggleCollapsed"
        v-show="!collapsed"
      ></Icon>
      <Icon
        title="Hide history"
        icon="collapse"
        color="black"
        @click="toggleCollapsed"
        v-show="collapsed"
      ></Icon>
    </span>

    <div class="items" v-show="!collapsed">
      <Historyitem
        v-for="item in historyCache"
        :key="item.id.toString()"
        class="apphistoryitem"
        margin="10px"
        :text="getItemSummary(item)"
        @dragstart="startDrag($event, item)"
        :id="item.id.toString()"
      ></Historyitem>
    </div>
  </div>
</template>

<script>
import Icon from "../../icon";
import Historyitem from "./Historyitem";
import moment from "moment";

export default {
  name: "Chart",
  components: {
    Icon,
    Historyitem,
  },
  data() {
    return {
      collapsed: false,
    };
  },
  setup() {
    const startDrag = (event, item) => {
      event.dataTransfer.dropEffect = "copy";
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.setData("itemId", item.id);
    };

    return { startDrag };
  },
  computed: {
    hidden() {
      return this.$store.state.resultHistoryCache?.length === 0;
    },
    historyCache() {
      return this.$store.state.resultHistoryCache;
    },
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getFormatted(timestamp) {
      if (timestamp == null) return "";

      return moment(timestamp).format(`ddd MMM D Y hh:mm a`);
    },
    getDateRange(item) {
      const { resultHistory } = item;
      const samples = resultHistory.length;

      return `(${this.getFormatted(resultHistory[0].timestamp)} -
      ${this.getFormatted(resultHistory[samples - 1].timestamp)})`;
    },
    getItemSummary(item) {
      if (item == null) return "";

      return `id: ${item.id?.toString()} ${this.getDateRange(item)}}`;
    },
  },
};
</script>

<style scoped>
.history-items-container {
  border: 1px solid rgba(208, 212, 212, 0.8);
  padding: 10px;
  box-shadow: 10px 10px 8px #888888;
}

.title {
  opacity: 50%;
  padding-left: 30px;
}

.collapse-icon {
  float: right;
}

.items {
  width: 380px;
  overflow: wrap;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding-top: 5px;
}
.clearfix {
  overflow: auto;
}
</style>
