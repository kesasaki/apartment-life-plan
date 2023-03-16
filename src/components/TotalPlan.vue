<template>
  <div class="totalPlan">
    <h1>長期修繕計画 全体像</h1>
    <BarChart :chartData="getYearlyCosts" :chartOptions="dat2" />
    <div>
      <label for="volume">初年度の積立金残高</label>
      <input type="range" min="10000" max="400000" step="10000"  list="firstValue" v-model.number="firstvalue">
      {{ firstvalue / 100000 }}億円
    </div>
    <div>
      <label for="volume">毎月の修繕積立金</label>
      <input type="range" min="0" max="50000" step="500" list="tickmarksRepareDepositMonthlye" v-model.number="reparedepositmonthly">
      {{ reparedepositmonthly }}円/戸*月
    </div>
    <div>
      <label for="volume">戸数</label>
      <input type="range" min="2" max="2789" step="1" list="tickmarksNumberHouses" v-model.number="numberhouses">
      {{ numberhouses}}戸
    </div>
    <div>
      <label for="volume">毎年の修繕積立金の全戸合計</label>
      {{ getIncomeYealy / 10000 }}万円/年
    </div>
    <div>
      <label for="volume">床面積あたりの工事金額</label>
      <input type="range" min="3000" max="30000" step="100" list="tickmarksConstructionPricePerArea" v-model.number="constructionpriceperarea">
      {{ constructionpriceperarea / 10000}}万円/㎡
    </div>
    <div>
      <label for="volume">部屋面積の平均</label>
      <input type="range" min="5" max="200" step="1" list="tickmarksRoomAreaAve" v-model.number="roomareaave">
      {{ roomareaave }}㎡
    </div>
    <div>
      <label for="volume">分譲延べ床面積（部屋面積平均 * 戸数）</label>
      {{ getRoomAreaTotal }}㎡
    </div>
    <div>
      <label for="volume">建物延べ床部屋面積（分譲延べ床面積 / 0.75）</label>
      {{ getBuildingAreaTotal }}㎡
    </div>
    <div>
      <label for="volume">大規模修繕の金額(建物延べ床部屋面積 * 床面積あたりの工事金額)</label>
      {{ getConstructionPrice / 100000000 }}億円
    </div>
    <div>
      <label for="volume">大規模修繕の間隔</label>
      <input type="range" min="1" max="30" step="1" list="tickmarksOutgoInterval" v-model.number="outgointerval">
      {{ outgointerval }}年毎
    </div>
    <div>
      <label for="volume">毎年の修繕費の金額</label>
      <input type="range" min="10000" max="20000" step="1000"  list="tickmarksOutgoPrice2" v-model.number="outgoprice2">
      {{ outgoprice2 / 10 }}万円
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
    repareDepositMonthlyDefault: String,
    numberhousesDefault: String,
    outgoIntervalDefault: String,
    constructionPricePerAreaDefault: String,
    roomAreaAveDefault: String,
    outgoPrice2Default: String,
    firstValueDefault: String
  },
  data () {
    return {
      dat2: {
        responsive: true,
        animation: false,
      },
      reparedepositmonthly: Number(this.repareDepositMonthlyDefault),       // 0 ~ 500000
      numberhouses: Number(this.numberhousesDefault),       // 2 ~ 2789
      outgointerval: Number(this.outgoIntervalDefault), // 10 ~ 20
      constructionpriceperarea: Number(this.constructionPricePerAreaDefault),
      roomareaave: Number(this.roomAreaAveDefault),
      outgoprice2: Number(this.outgoPrice2Default),
      firstvalue: Number(this.firstValueDefault),
    }
  },
  computed: {
    getIncomeYealy: function() {
      return this.reparedepositmonthly * 12 * this.numberhouses
    },
    getRoomAreaTotal: function() {
      return this.roomareaave * this.numberhouses
    },
    getBuildingAreaTotal: function() {
      return Math.round(this.getRoomAreaTotal / 0.75)
    },
    getConstructionPrice: function() {
      return this.getBuildingAreaTotal * this.constructionpriceperarea;
    },
    getYearlyCosts: function () {
      var incomeArray = Lib.getYearlyCostsArray(2022, 2060, this.getIncomeYealy / 1000, 1, 0);
      var outgoArray1 = Lib.getYearlyCostsArray(2022, 2060, this.getConstructionPrice / 1000, this.outgointerval, 0);
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
input[type="range"] {
  width: 400px;
  margin: 0;
}
</style>
