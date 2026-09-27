<script setup>
import ExpenseList from './components/ExpenseList.vue'
</script>
<template>
  <header>
    <h1 class="logo">支出管理</h1>
  </header>
  <main>
    <ExpenseList />
  </main>
  <footer></footer>
</template>
<style scoped>
header {
  border-bottom: solid 1px #fff;
  background-color: lightblue;
  padding: 10px;
}
.logo {
  margin: 0;
  font-weight: 500;
}
</style>
