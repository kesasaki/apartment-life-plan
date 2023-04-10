<template>
    <header>
    <nav>
      <ul>
        <li><a class="nav-link" href="/">ホーム</a></li>
        <li><a class="nav-link" href="#">お問い合わせ</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
</script>

<style scoped>
/* Header styles */
header {
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 40px;
}

nav ul {
  display: flex;
  list-style: none;
}

nav li {
  margin-right: 20px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #ccc;
}
</style>