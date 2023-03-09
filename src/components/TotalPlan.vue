<template>
  <div class="totalPlan">
    <h1>長期修繕計画 全体像</h1>
    <BarChart :chartData="getYearlyCosts" :chartOptions="dat2" />
    <div>
      <label for="volume">修繕積立金合計/年</label>
      <input type="range" min="0" max="60000" step="1000" list="tickmarksIncomePrice" v-model.number="incomeprice">
    </div>
    <div>
      <label for="volume">大規模修繕の間隔</label>
      <input type="range" min="1" max="30" step="1" list="tickmarksOutgoInterval" v-model.number="outgointerval">
    </div>
    <div>
      <label for="volume">大規模修繕の金額</label>
      <input type="range" min="10000" max="400000" step="10000" list="tickmarksOutgoPrice1" v-model.number="outgoprice1">
    </div>
    <div>
      <label for="volume">恒常的にかかる修繕費の金額</label>
      <input type="range" min="10000" max="20000" step="1000"  list="tickmarksOutgoPrice2" v-model.number="outgoprice2">
    </div>
    <div>
      <label for="volume">初年度の残高</label>
      <input type="range" min="10000" max="400000" step="10000"  list="firstValue" v-model.number="firstvalue">
    </div>
  </div>
</template>

<script>
import BarChart from './BarChart.vue';
import Lib from '../lib/lib.js';
export default {
  name: 'totalPlan',
  components: {
    BarChart
  },
  props: {
    incomePriceDefault: String,
    outgoIntervalDefault: String,
    outgoPrice1Default: String,
    outgoPrice2Default: String,
    firstValueDefault: String
  },
  data () {
    return {
      dat2: {
        responsive: true,
        animation: false,
      },
      incomeprice: Number(this.incomePriceDefault),       // 10000 ~ 400000
      outgointerval: Number(this.outgoIntervalDefault), // 10 ~ 20
      outgoprice1: Number(this.outgoPrice1Default),
      outgoprice2: Number(this.outgoPrice2Default),
      firstvalue: Number(this.firstValueDefault),
    }
  },
  computed: {
    getYearlyCosts: function () {
      var incomeArray = Lib.getYearlyCostsArray(2022, 2060, this.incomeprice, 1, 0);
      var outgoArray1 = Lib.getYearlyCostsArray(2022, 2060, this.outgoprice1, this.outgointerval, 0);
      var outgoArray2 = Lib.getYearlyCostsArray(2022, 2060, this.outgoprice2, 1, 0);
      var outgoArray = Lib.getAddedArray(2022, 2060, outgoArray1, outgoArray2);
      var years = Lib.getSubedArray(2022, 2060, incomeArray, outgoArray);
      var balance = Lib.getBalanceArray(2022, 2060, years, this.firstvalue);
      return {
        labels: Lib.getYearsArray(2022, 2060),
        datasets: [ { data: balance} ]
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
