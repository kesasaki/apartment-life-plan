<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to My Vue.js App"/>
  <TotalPlan/>
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
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ItemPlan from './components/ItemPlan.vue'
import TotalPlan from './components/TotalPlan.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    ItemPlan,
    TotalPlan
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
