<template>
  <SiteHeader/>
  <ContentsHeader/>
  <TotalPlan
    repareReserveMonthlyDefault="19000"
    numberhousesDefault="130"
    outgoIntervalDefault="15"
    constructionPricePerAreaDefault="15000"
    roomAreaAveDefault="80"
    floorsDefault="7"
    firstValueDefault="200000"
    temporaryMoneyDefault="0"
    nextConstructionDefault="2"
  />
  <!--
  <ItemPlan itemName="修繕積立金 / 年" defaultPrice="29000" defaultInterval="1" defaultPrev="0" />
  <ItemPlan itemName="大規模修繕" defaultPrice="200000" defaultInterval="15" defaultPrev="0" />
  <ItemPlan itemName="大規模修繕以外の積立金利用" defaultPrice="19000" defaultInterval="1" defaultPrev="0" />
  <ItemPlan itemName="仮設工事"/>
  <ItemPlan itemName="屋上防水"/>
  <ItemPlan itemName="床防水"/>
  <ItemPlan itemName="外壁塗装等"/>
  <ItemPlan itemName="鉄部塗装等"/>
  <ItemPlan itemName="建具・金物等"/>
  <ItemPlan itemName="共用内部等"/>
  <ItemPlan itemName="給水設備"/>
  <ItemPlan itemName="排水設備"/>
  <ItemPlan itemName="ガス設備"/>
  <ItemPlan itemName="空調・換気設備"/>
  <ItemPlan itemName="電灯設備"/>
  <ItemPlan itemName="情報通信設備"/>
  <ItemPlan itemName="消防用設備"/>
  <ItemPlan itemName="昇降機設備"/>
  <ItemPlan itemName="立体駐車場設備"/>
  <ItemPlan itemName="外構・付属施設"/>
  <ItemPlan itemName="調査・診断、設計、工事管理等費用"/>
  <ItemPlan itemName="長期修繕計画作成費用"/>
  -->
</template>

<script>
import SiteHeader from './components/SiteHeader.vue'
import ContentsHeader from './components/ContentsHeader.vue'
import TotalPlan from './components/TotalPlan.vue'

export default {
  name: 'App',
  components: {
    SiteHeader,
    ContentsHeader,
    TotalPlan
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Reset styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Base styles */
body {
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 16px;
  line-height: 1.5;
}
</style>
