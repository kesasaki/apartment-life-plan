<template>
  <div class="itemPlan">
    <h3>{{ itemName }}</h3>
    <BarChart :chartData="getYearlyCosts" :chartOptions="dat2" />
    <div>
      <label for="volume">費用</label>
      <input type="range" min="10000" max="400000" step="10000" list="tickmarksPrice" v-model.number="price">
    </div>
    <div>
      <label for="volume">間隔</label>
      <input type="range" min="1" max="30" step="1" list="tickmarksInterval" v-model.number="interval">
    </div>
    <div>
      <label for="volume">前回実施年度</label>
      <input type="range" min="0" max="30" step="1" list="tickmarksPrev" v-model.number="prev">
    </div>
  </div>
</template>

<script>
import BarChart from './BarChart.vue';
import Lib from '../lib/lib.js';
export default {
  name: 'itemPlan',
  components: {
    BarChart
  },
  props: {
    itemName: String,
    defaultPrice: String,
    defaultInterval: String,
    defaultPrev: String
  },
  data () {
    return {
      dat2: {
        responsive: true,
        animation: false,
      },
      price: Number(this.defaultPrice),       // 10000 ~ 400000
      interval: Number(this.defaultInterval), // 10 ~ 20
      prev: Number(this.defaultPrev),         // 0 ~ 30
    }
  },
  computed: {
    getYearlyCosts: function () {
      return {
        labels: Lib.getYearsArray(2022, 2060),
        datasets: [ { data: Lib.getYearlyCostsArray(2022, 2060, this.price, this.interval, this.prev) } ]
      }
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input[type="range"] {
  width: 500px;
  margin: 0;
}
</style>
