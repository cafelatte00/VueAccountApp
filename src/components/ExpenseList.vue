<script setup>
import { ref, computed } from 'vue'
import { categories } from '@/constants/categories'

const expenses = ref([])
const id = ref(1)
const date = ref('')
const title = ref('')
const amount = ref(0)
const category = ref('')
function registerExpense() {
  console.log('expense')
  if (amount.value <= 0) {
    alert('金額を正しく入力してください')
    return
  }
  const new_expense = {
    id: id.value++,
    date: date.value,
    title: title.value,
    amount: amount.value,
    category: category.value,
  }
  console.log(expenses.value)
  expenses.value.push(new_expense)
  date.value = ''
  title.value = ''
  amount.value = 0
  category.value = ''
}
const totalAmount = computed(() => {
  return expenses.value.reduce((total, expense) => {
    return total + Number(expense.amount)
  }, 0)
})
function getCategoryLabel(value) {
  const category = categories.find((category) => {
    return category.value === value
  })

  return category?.label
}
</script>
<template>
  <h2>支出を記録</h2>

  <form @submit.prevent="registerExpense">
    <div>
      <label>日付</label>
      <input v-model="date" type="date" />
    </div>

    <div>
      <label>内容</label>
      <input v-model="title" type="text" />
    </div>

    <div>
      <label for="amount">金額</label>
      <input v-model="amount" type="number" />
    </div>

    <div>
      <label for="category">分類</label>
      <select v-model="category" name="category">
        <option value="">選択してください</option>

        <option v-for="category in categories" :key="category.value" :value="category.value">
          {{ category.label }}
        </option>
      </select>
    </div>
    <button type="submit">登録</button>
  </form>
  <hr />

  <h2>今月の支出{{ totalAmount }}円</h2>
  <table border="2">
    <tr>
      <th>日付</th>
      <th>内容</th>
      <th>金額</th>
      <th>分類</th>
    </tr>
    <tr v-for="expense in expenses" :key="expense.id">
      <td>{{ expense.date }}</td>
      <td>{{ expense.title }}</td>
      <td>{{ expense.amount }}円</td>
      <td>{{ getCategoryLabel(expense.category) }}</td>
    </tr>
  </table>
  <h3>合計{{ totalAmount }}円</h3>
</template>
<style scoped>
table {
  border-collapse: collapse;
  border-color: grey;
}
</style>
