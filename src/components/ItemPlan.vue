<template>
  <div class="itemPlan">
    <h3>{{ itemName }}</h3>
    <ul>
      <li><a href="#" target="_blank" rel="noopener">item1</a></li>
      <li><a href="#" target="_blank" rel="noopener">item1</a></li>
      <li><a href="#" target="_blank" rel="noopener">item1</a></li>
      <li><a href="#" target="_blank" rel="noopener">item1</a></li>
    </ul>
    <BarChart :chartData="dat1" :chartOptions="dat2" />
  </div>
</template>

<script>
import BarChart from './BarChart.vue';
import Lib from '../lib/lib.js';
const years = Lib.getYearsArray(2022, 2060);
const yearlyCosts = Lib.getYearlyCostsArray(2022, 2060, 30, 15, 5);
export default {
  name: 'itemPlan',
  components: {
    BarChart
  },
  props: {
    itemName: String
  },
  data () {
    return {
      dat1: {
        labels: years,
        datasets: [ { data: yearlyCosts } ]
      },
      dat2: {
        responsive: true
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
</style>
