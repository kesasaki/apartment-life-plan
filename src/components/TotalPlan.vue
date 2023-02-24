<template>
  <div class="totalPlan">
    <h1>長期修繕計画 全体像</h1>
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
export default {
  name: 'totalPlan',
  components: {
    BarChart
  },
  props: {
  },
  data () {
    return {
      dat1: {
        labels: years,
        datasets: [ { data: [40, 20, 12, 12] } ]
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
