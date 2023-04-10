<template>
  <div class="totalPlan">
    <div class="totalPlanContents">
      <div class="totalGraph">
        <div class="totalGraphBody">
          <BarChart :chartData="getYearlyCosts" :chartOptions="dat2" />
          <!--
        <p>グラフがマイナスにならなければ計画に問題はありません</p>
        <p>グラフがマイナスであれば資金が足りなくなり長期的な修繕が行えない可能性があります。</p>
        <p>購入前の場合は不動産会社に問合せ、修繕計画の確認を行ってください。</p>
        <p>保有マンションの場合は大規模修繕の間隔や積立金の変更、一時徴収金の検討を行います。</p>
        -->
        </div>
      </div>

      <h2>基本項目（物件購入前の資金状況確認用）</h2>
      <div class="sliders-explain">
        <p>住宅情報サイトや不動産会社への聞き取りから入力してください。</p>
      </div>
      <div class="sliders">
        <div class="slider">
          <label class="slider-label" for="slider">戸数</label>
          <input class="slider-input" type="range" min="2" max="2789" step="1" list="tickmarksNumberHouses"
            v-model.number="numberhouses">
          <div class="slider-value"> {{ numberhouses }}戸 </div>
        </div>
        <div class="slider">
          <label class="slider-label" for="slider">部屋面積の平均</label>
          <input class="slider-input" type="range" min="5" max="200" step="1" list="tickmarksRoomAreaAve"
            v-model.number="roomareaave">
          <div class="slider-value"> {{ roomareaave }}㎡ </div>
        </div>
        <div class="slider">
          <label class="slider-label" for="slider">階数</label>
          <input class="slider-input" type="range" min="1" max="60" step="1" list="tickmarksFloors"
            v-model.number="floors">
          <div class="slider-value"> {{ floors }}階建て </div>
        </div>
        <div class="slider">
          <label class="slider-label" for="slider">現在の積立金残高</label>
          <input class="slider-input" type="range" min="10000" max="3000000" step="10000" list="firstValue"
            v-model.number="firstvalue">
          <div class="slider-value"> {{ firstvalue / 100000 }}億円 </div>
        </div>
        <div class="slider">
          <label class="slider-label" for="slider">次の大規模修繕</label>
          <input class="slider-input" type="range" min="0" max="20" step="1" list="tickmarksNext"
            v-model.number="nextconstruction">
          <div class="slider-value"> {{ nextconstruction }}年後 </div>
        </div>
      </div>

      <h2>追加項目（保有物件の長期計画確認用）</h2>
      <div class="sliders-explain">
        <p>理事会や管理会社に確認して入力してください。デフォルトの値は国土交通省調査の平均値、一般的な値（一時徴収金はしない、など）です。</p>
      </div>
      <h3>収入1: 修繕積立金</h3>
      <div class="sliders-explain">
        <p>毎月払う修繕積立金です。主な収入源です。</p>
      </div>
      <div class="sliders">

        <div class="sliders">
          <div class="slider">
            <label class="slider-label" for="slider">修繕積立金（各戸毎月）</label>
            <input class="slider-input" type="range" min="0" max="50000" step="500" list="tickmarksRepareReserveMonthlye"
              v-model.number="reparereservemonthly">
            <div class="slider-value"> {{ reparereservemonthly }}円/戸*月 </div>
          </div>
          <div class="slider">
            <label class="slider-label" for="slider">修繕積立金（合計毎年）</label>
            <div class="slider-input">修繕積立金（各戸毎月）{{ reparereservemonthly }}円 * 12ヶ月 * 戸数（{{ numberhouses }}戸） = </div>
            <div class="slider-value"> {{ getIncomeYealy / 10000 }}万円/年 </div>
          </div>
        </div>
      </div>

      <h3>収入2: 一時徴収金</h3>
      <div class="sliders-explain">
        <p>資金が足りない時に臨時で住人から徴収するお金です。</p>
      </div>
      <div class="sliders">

        <div class="slider">
          <label class="slider-label" for="slider">一時徴収金</label>
          <input class="slider-input" type="range" min="0" max="10000000" step="100000" list="tickmarksTemporaryMoney"
            v-model.number="temporarymoney">
          <div class="slider-value"> {{ temporarymoney / 10000 }}万円/戸 </div>
        </div>
        <div class="slider">
          <label class="slider-label" for="slider">一時徴収金の合計</label>
          <div class="slider-input">一時徴収金（{{ temporarymoney / 10000 }}万円/戸）* {{ numberhouses }}戸 = </div>
          <div class="slider-value"> {{ getTotalTemporaryMoney / 100000000 }}億円 </div>
        </div>
      </div>

      <h3>支出1: 大規模修繕工事の費用</h3>
      <div class="sliders-explain">
        <p>大規模修繕工事にかかる費用です。工事額の大小の調整は「大規模改修の工事金額 / 床面積」で行ってください。</p>
      </div>
      <div class="sliders">

        <div class="slider">
          <label class="slider-label" for="slider">大規模改修の工事金額 / 床面積</label>
          <input class="slider-input" type="range" min="3000" max="30000" step="100"
            list="tickmarksConstructionPricePerArea" v-model.number="constructionpriceperarea">
          <div class="slider-value"> {{ constructionpriceperarea / 10000 }}万円/㎡ </div>
        </div>
        <div class="slider">
          <label class="slider-label" for="slider">大規模修繕の工事金額合計金額</label>
          <div class="slider-input">
            <div style="font-size: small"> 大規模改修の工事金額 / 床面積（{{ constructionpriceperarea / 10000 }}万円/㎡） * 建物延べ床面積（{{
              getBuildingAreaTotal }}㎡）= </div>
          </div>
          <div class="slider-value"> {{ Math.round(getConstructionPrice / 10000000) / 10 }}億円 </div>
        </div>
        <div class="slider">
          <label class="slider-label" for="slider">建物延べ床面積</label>
          <div class="slider-input">分譲延べ床面積（{{ getRoomAreaTotal }}㎡） / 0.75 = </div>
          <div class="slider-value"> {{ getBuildingAreaTotal }}㎡ </div>
        </div>
        <div class="slider">
          <label class="slider-label" for="slider">分譲延べ床面積</label>
          <div class="slider-input">部屋面積平均 * 戸数({{ numberhouses }}戸) = </div>
          <div class="slider-value"> {{ getRoomAreaTotal }}㎡ </div>
        </div>
        <div class="slider">
          <label class="slider-label" for="slider">大規模修繕の間隔</label>
          <input class="slider-input" type="range" min="10" max="20" step="1" list="tickmarksOutgoInterval"
            v-model.number="outgointerval">
          <div class="slider-value"> {{ outgointerval }}年毎 </div>
        </div>
      </div>

      <h3>支出2: 小修繕費</h3>
      <div class="sliders-explain">
        <p>毎年かかる大規模修繕以外の修繕費です。計算上は修繕金から大規模改修の費用を除いた額です。</p>
        <p>国交省調査の<a href="https://www.s-mankan.com/information/5282/">修繕積立金の平均額</a>の計画期間合計が
          <a href="https://www.mlit.go.jp/common/001234283.pdf">同省調査の大規模修繕工事額</a>の合計より明らかに多いため、
          差額を小修繕費としています。
        </p>
      </div>
      <div class="minor-repair-explain-image">
        <img src="https://longtermrepairplan.s3.ap-northeast-1.amazonaws.com/images/minor_repair3.png">
        <img src="https://longtermrepairplan.s3.ap-northeast-1.amazonaws.com/images/minor_repair4.png">
      </div>
      <div class="minor-repair-logic">

        <div class="slider">
          <label class="slider-label" for="slider">小修繕費 / 年</label>
          <div class="slider-input">
            <div style="font-size: small"> 小修繕費の全計画期間合計（{{ Math.round(getTotalPriceWithoutLargeConstruction / 1000000) /
              100
            }}億円） /
              長期計画期間40年） =</div>
          </div>
          <div class="slider-value"> {{ Math.round(getYearlyPriceWithoutLargeConstruction / 10000) }}万円/年 </div>
        </div>
        <div class="slider">
          <label class="slider-label" for="slider">小修繕費の全計画期間合計</label>
          <div class="slider-input">
            <div style="font-size: small"> 長期修繕計画の合計金額（{{ Math.round(getLongPlanTotalPrice / 1000000) / 100 }}億円） -
              大規模修繕工事の平均金額合計（{{
                Math.round(getTotalPriceLargeConstruction / 1000000) / 100 }}億円） = </div>
          </div>
          <div class="slider-value"> {{ Math.round(getTotalPriceWithoutLargeConstruction / 1000000) / 100 }}億円 / 40年
          </div>
        </div>
        <div class="total-repair-cost-logic">
          <div class="slider">
            <label class="slider-label" for="slider">長期修繕計画の合計金額</label>
            <div class="slider-input">
              <div style="font-size: small"> 修繕積立金目安（{{ getRepareReserveAve }}円/㎡*月） * 12ヶ月 * 分譲延べ床面積（{{ getRoomAreaTotal
              }}㎡）
                * 長期計画期間（40年） = </div>
            </div>
            <div class="slider-value"> {{ Math.round(getLongPlanTotalPrice / 1000000) / 100 }}億円 </div>
          </div>
          <div class="slider">
            <label class="slider-label" for="slider">修繕積立金目安</label>
            <div class="slider-input">
              <div style="font-size: small">
                <a href="https://www.s-mankan.com/information/5282/">
                  マンションの修繕積立金に関するガイドライン(2021年（令和3年）9月改訂)(リンク先の「修繕積立金ガイドラインの計算方法」)
                </a>より以下のため
                <ul>
                  <li>{{ floors }}階建て</li>
                  <li>建築延べ床面積{{ getBuildingAreaTotal }}㎡</li>
                </ul>
              </div>
            </div>
            <div class="slider-value"> {{ getRepareReserveAve }}円/㎡*月 </div>
          </div>
        </div>

        <div class="total-large-repair-cost-logic">
          <div class="slider">
            <label class="slider-label" for="slider">大規模修繕工事の平均金額合計</label>
            <div class="slider-input">
              <div style="font-size: small"> 大規模修繕工事の平均金額（{{ Math.round(getConstructionPriceAve / 1000000) / 100 }}億円） *
                大規模修繕の回数（{{
                  getCountLargeConstruction }}回） = </div>
            </div>
            <div class="slider-value"> {{ Math.round(getTotalPriceLargeConstruction / 1000000) / 100 }}億円 </div>
          </div>
          <div class="slider">
            <label class="slider-label" for="slider">大規模修繕工事の平均金額</label>
            <div class="slider-input">
              <div style="font-size: small"> 建物延べ床面積（{{ getBuildingAreaTotal }}㎡） * 15000円<br>（<a
                  href="https://www.mlit.go.jp/common/001234283.pdf">令和３年度マンション大規模修繕工事に関する実態調査</a>の「④大規模修繕工事回数と床面積（㎡）あたり工事金額」より）
              </div>
            </div>
            <div class="slider-value"> {{ Math.round(getConstructionPriceAve / 1000000) / 100 }}億円 </div>
          </div>
          <div class="slider">
            <label class="slider-label" for="slider">大規模修繕の回数<div style="font-size: small">(長期計画期間中)</div></label>
            <div class="slider-input"></div>
            <div class="slider-value"> {{ getCountLargeConstruction }}回 </div>
          </div>
        </div>
      </div>
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
    temporaryMoneyDefault: String,
    nextConstructionDefault: String
  },
  data() {
    return {
      dat2: {
        responsive: true,
        animation: false,
      },
      reparereservemonthly: Number(this.repareReserveMonthlyDefault), // 修繕積立金（各戸毎月） 0 ~ 500000
      numberhouses: Number(this.numberhousesDefault),       // 戸数 2 ~ 2789
      outgointerval: Number(this.outgoIntervalDefault), // 大規模修繕の間隔 10 ~ 20
      constructionpriceperarea: Number(this.constructionPricePerAreaDefault), // 大規模改修の工事金額 / 床面積
      roomareaave: Number(this.roomAreaAveDefault), // 部屋面積の平均
      floors: Number(this.floorsDefault), // 階数
      firstvalue: Number(this.firstValueDefault), // 現在の積立金残高
      temporarymoney: Number(this.temporaryMoneyDefault), // 一時徴収金
      nextconstruction: Number(this.nextConstructionDefault), // 次の大規模修繕
    }
  },
  watch: {
    // dataの値が変更されたときにURLパラメータを更新
    reparereservemonthly(newVal) {
      this.$router.replace({ query: { rsm: newVal } });
    },
    numberhouses(newVal) {
      this.$router.replace({ query: { nh: newVal } });
    },
    outgointerval(newVal) {
      this.$router.replace({ query: { oi: newVal } });
    },
    constructionpriceperarea(newVal) {
      this.$router.replace({ query: { cppa: newVal } });
    },
    roomareaave(newVal) {
      this.$router.replace({ query: { raa: newVal } });
    },
    floors(newVal) {
      this.$router.replace({ query: { f: newVal } });
    },
    firstvalue(newVal) {
      this.$router.replace({ query: { fv: newVal } });
    },
    temporarymoney(newVal) {
      this.$router.replace({ query: { tm: newVal } });
    },
    nextconstruction(newVal) {
      this.$router.replace({ query: { nc: newVal } });
    },
    // URLパラメータからdataの初期値を設定
    $route: {
      immediate: true, // マウント時にも設定
      handler() {
        if (this.$route.query.rsm) {
          this.reparereservemonthly = this.$route.query.rsm;
        }
        if (this.$route.query.nh) {
          this.numberhouses = this.$route.query.nh;
        }
        if (this.$route.query.oi) {
          this.outgointerval = this.$route.query.oi;
        }
        if (this.$route.query.cppa) {
          this.constructionpriceperarea = this.$route.query.cppa;
        }
        if (this.$route.query.raa) {
          this.roomareaave = this.$route.query.raa;
        }
        if (this.$route.query.f) {
          this.floors = this.$route.query.f;
        }
        if (this.$route.query.fv) {
          this.firstvalue = this.$route.query.fv;
        }
        if (this.$route.query.tm) {
          this.temporarymoney = this.$route.query.tm;
        }
        if (this.$route.query.nc) {
          this.nextconstruction = this.$route.query.nc;
        }
      }
    }
  },
  computed: {
    // 毎年の修繕積立金合計
    getIncomeYealy: function () {
      return this.reparereservemonthly * 12 * this.numberhouses
    },
    // 分譲延べ床面積
    getRoomAreaTotal: function () {
      return this.roomareaave * this.numberhouses
    },
    // 建築延べ床面積
    getBuildingAreaTotal: function () {
      return Math.round(this.getRoomAreaTotal / 0.75)
    },
    // 大規模修繕の金額
    getConstructionPrice: function () {
      return this.getBuildingAreaTotal * this.constructionpriceperarea;
    },
    // 大規模修繕工事金額の平均値
    getConstructionPriceAve: function () {
      // ロジック参考
      // 令和３年度マンション大規模修繕工事に関する実態調査
      // https://www.mlit.go.jp/common/001234283.pdf
      // の「④大規模修繕工事回数と床面積（㎡）あたり工事金額」より
      return this.getBuildingAreaTotal * 15000;
    },
    // 月額の積立金平均
    getRepareReserveAve: function () {
      // ロジック参考
      // マンションの修繕積立金に関するガイドライン(2021年（令和3年）9月改訂)
      // https://www.mlit.go.jp/common/001080837.pdf リンク切れ
      // https://www.nikkei.com/article/DGXZQOMH211LJ0R21C22A1000000/ 上記内容が引用されている
      if (this.floors >= 20) {
        return 340
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
    getLongPlanTotalPrice: function () {
      return this.getRepareReserveAve * 12 * this.getRoomAreaTotal * 40;
    },
    // 期間中の大規模修繕の回数
    getCountLargeConstruction: function () {
      //return Math.ceil(40 / this.outgointerval)
      return 3
    },
    // 大規模修繕の上記回数の合計金額
    getTotalPriceLargeConstruction: function () {
      return this.getCountLargeConstruction * this.getConstructionPriceAve
    },
    // 大規模修繕費を除いた修繕費の合計金額
    getTotalPriceWithoutLargeConstruction: function () {
      return this.getLongPlanTotalPrice - this.getTotalPriceLargeConstruction
    },
    // 大規模修繕費を除いた毎年の修繕費の金額
    getYearlyPriceWithoutLargeConstruction: function () {
      return Math.round(this.getTotalPriceWithoutLargeConstruction / 40);
    },
    // 一時徴収金の合計
    getTotalTemporaryMoney: function () {
      return this.temporarymoney * this.numberhouses;
    },
    // 年毎の残高
    getYearlyCosts: function () {
      // 収入
      var incomeArray1 = Lib.getYearlyCostsArray(2022, 2060, this.getIncomeYealy / 1000, 1, 0);
      var incomeArray2 = Lib.getYearlyCostsArray(2022, 2060, this.getTotalTemporaryMoney / 1000, 40, 41);
      var incomeArray = Lib.getAddedArray(2022, 2060, incomeArray1, incomeArray2);
      // 支出
      var outgoArray1 = Lib.getYearlyCostsArray(2022, 2060, this.getConstructionPrice / 1000, this.outgointerval, this.nextconstruction);
      var outgoArray2 = Lib.getYearlyCostsArray(2022, 2060, this.getYearlyPriceWithoutLargeConstruction / 1000, 1, 0);
      var outgoArray = Lib.getAddedArray(2022, 2060, outgoArray1, outgoArray2);
      // 収支
      var years = Lib.getSubedArray(2022, 2060, incomeArray, outgoArray);
      var balance = Lib.getBalanceArray(2022, 2060, years, this.firstvalue);
      return {
        labels: Lib.getYearsArray(2022, 2060),
        datasets: [{ data: balance }]
      }
    }
  }
}
</script>

<style scoped>
h2 {
  background-color: #fff;
  color: #333;
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 10px;
}

h3 {
  background-color: #fff;
  color: #333;
  font-size: 16px;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 10px;
}

/* メインコンテンツのスタイル */
.totalPlan {
  max-width: 1200px;
  margin: 0 auto;
}

.totalPlanContents {
  margin: 0 10px;
}

.totalGraph {
  margin: 0 0 30px 0;
}
.totalGraphBody {
  max-width: 1000px;
  margin: 0 auto;
}

.sliders-explain {
  max-width: 1200px;
  margin: 10px auto;
  color: #333;
  font-size: 15px;
}

.sliders {
  background-color: #F1ECEB;
  border-radius: 10px;
  padding: 20px;
}

.slider {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}

.slider-label {
  flex: 1;
  margin-right: 10px;
  text-align: right;
}

.slider-input {
  flex: 2;
  margin-right: 10px;
}

.slider-input ul {
  list-style-position: inside;
  margin-left: 10px;
}

.slider-value {
  flex: 1;
  text-align: left;
}

.minor-repair-explain-image img {
  max-width: 100%;
  height: auto;
}

.minor-repair-logic {
  background-color: #F1ECEB;
  border-radius: 10px;
  padding: 20px;
}

.total-repair-cost-logic {
  background-color: #eed4f3;
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0;
}

.total-large-repair-cost-logic {
  background-color: #caeee0;
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0;
}
</style>
