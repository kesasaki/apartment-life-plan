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
      <input type="range" min="0" max="50000" step="500" list="tickmarksRepareReserveMonthlye" v-model.number="reparereservemonthly">
      {{ reparereservemonthly }}円/戸*月
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
      <label for="volume">階数</label>
      <input type="range" min="1" max="60" step="1"  list="tickmarksFloors" v-model.number="floors">
      {{ floors }}階建て
    </div>
    <div>
      <label for="volume">毎月の修繕積立金目安(修繕費計算用)</label>
      {{ getRepareReserveAve }}円/㎡*月
    </div>
    <div>
      <label for="volume">長期修繕計画の合計金額</label>
      {{ getLongPlanTotalPrice / 100000000 }}億円
    </div>
    <div>
      <label for="volume">期間中の大規模修繕の回数</label>
      {{ getCountLargeConstruction }}回
    </div>
    <div>
      <label for="volume">大規模修繕の上記回数の合計金額</label>
      {{ getTotalPriceLargeConstruction / 100000000 }}億円
    </div>
    <div>
      <label for="volume">大規模修繕費を除いた修繕費の合計金額</label>
      {{ getTotalPriceWithoutLargeConstruction / 100000000 }}億円
    </div>
    <div>
      <label for="volume">大規模修繕費を除いた毎年の修繕費の金額</label>
      {{ getYearlyPriceWithoutLargeConstruction / 10000 }}万円
    </div>
    <div>
      <label for="volume">一時徴収金</label>
      <input type="range" min="0" max="100000000" step="100000"  list="tickmarksTemporaryMoney" v-model.number="temporarymoney">
      {{ temporarymoney / 10000}}万円/戸
    </div>
    <div>
      <label for="volume">一時徴収金の合計</label>
      {{ getTotalTemporaryMoney / 10000 }}万円
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
    repareReserveMonthlyDefault: String,
    numberhousesDefault: String,
    outgoIntervalDefault: String,
    constructionPricePerAreaDefault: String,
    roomAreaAveDefault: String,
    floorsDefault: String,
    firstValueDefault: String,
    temporaryMoneyDefault: String
  },
  data () {
    return {
      dat2: {
        responsive: true,
        animation: false,
      },
      reparereservemonthly: Number(this.repareReserveMonthlyDefault),       // 0 ~ 500000
      numberhouses: Number(this.numberhousesDefault),       // 2 ~ 2789
      outgointerval: Number(this.outgoIntervalDefault), // 10 ~ 20
      constructionpriceperarea: Number(this.constructionPricePerAreaDefault),
      roomareaave: Number(this.roomAreaAveDefault),
      floors: Number(this.floorsDefault),
      firstvalue: Number(this.firstValueDefault),
      temporarymoney: Number(this.temporaryMoneyDefault),
    }
  },
  computed: {
    // 毎年の修繕積立金合計
    getIncomeYealy: function() {
      return this.reparereservemonthly * 12 * this.numberhouses
    },
    // 分譲延べ床面積
    getRoomAreaTotal: function() {
      return this.roomareaave * this.numberhouses
    },
    // 建築延べ床面積
    getBuildingAreaTotal: function() {
      return Math.round(this.getRoomAreaTotal / 0.75)
    },
    // 大規模修繕の金額
    getConstructionPrice: function() {
      return this.getBuildingAreaTotal * this.constructionpriceperarea;
    },
    // 月額の積立金平均
    getRepareReserveAve: function() {
      // ロジック参考
      // https://www.mlit.go.jp/common/001080837.pdf
      if (this.floors >= 20) {
        return 338
      }
      if (this.getBuildingAreaTotal < 5000) {
        return 335
      }
      if (this.getBuildingAreaTotal >= 5000 && this.getBuildingAreaTotal < 10000) {
        return 252
      }
      if (this.getBuildingAreaTotal >= 10000 && this.getBuildingAreaTotal < 20000) {
        return 271
      }
      return 255
    },
    // 長期修繕計画の合計金額
    getLongPlanTotalPrice: function() {
      return this.getRepareReserveAve * 12 * this.getRoomAreaTotal * 38;
    },
    // 期間中の大規模修繕の回数
    getCountLargeConstruction: function() {
      return Math.ceil(38 / this.outgointerval)
    },
    // 大規模修繕の上記回数の合計金額
    getTotalPriceLargeConstruction: function() {
      return this.getCountLargeConstruction * this.getConstructionPrice
    },
    // 大規模修繕費を除いた修繕費の合計金額
    getTotalPriceWithoutLargeConstruction: function() {
      return this.getLongPlanTotalPrice - this.getTotalPriceLargeConstruction
    },
    // 大規模修繕費を除いた毎年の修繕費の金額
    getYearlyPriceWithoutLargeConstruction: function() {
      return Math.round(this.getTotalPriceWithoutLargeConstruction / 38);
    },
    // 一時徴収金の合計
    getTotalTemporaryMoney: function() {
      return this.temporarymoney * this.numberhouses;
    },
    // 年毎の残高
    getYearlyCosts: function () {
      // 収入
      var incomeArray1 = Lib.getYearlyCostsArray(2022, 2060, this.getIncomeYealy / 1000, 1, 0);
      var incomeArray2 = Lib.getYearlyCostsArray(2022, 2060, this.getTotalTemporaryMoney / 1000, 38, 39);
      var incomeArray = Lib.getAddedArray(2022, 2060, incomeArray1, incomeArray2);
      // 支出
      var outgoArray1 = Lib.getYearlyCostsArray(2022, 2060, this.getConstructionPrice / 1000, this.outgointerval, 0);
      var outgoArray2 = Lib.getYearlyCostsArray(2022, 2060, this.getYearlyPriceWithoutLargeConstruction / 1000, 1, 0);
      var outgoArray = Lib.getAddedArray(2022, 2060, outgoArray1, outgoArray2);
      // 収支
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
