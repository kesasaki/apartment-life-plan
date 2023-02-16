<template>
  <div class="itemPlan">
    <h3>{{ itemName }}</h3>
    <ul>
      <li><a href="#" target="_blank" rel="noopener">item1</a></li>
      <li><a href="#" target="_blank" rel="noopener">item1</a></li>
      <li><a href="#" target="_blank" rel="noopener">item1</a></li>
      <li><a href="#" target="_blank" rel="noopener">item1</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'itemPlan',
  props: {
    itemName: String
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
