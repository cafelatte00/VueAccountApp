<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { categories } from '@/constants/categories'

const expenses = ref([])
const id = ref(1)
const form = reactive({
  date: '',
  title: '',
  amount: '',
  category: '',
})

const isOver50kNotified = ref(false)

function registerExpense() {
  // 日付
  if (!form.date) {
    alert('日付を入力してください。')
    return
  }
  // 内容
  if (!form.title) {
    alert('内容を入力してください。')
    return
  }
  // 金額
  if (form.amount === '' || form.amount < 0) {
    alert('金額を正しく入力してください')
    return
  }
  // 分類
  if (!form.category) {
    alert('分類を選んでください。')
    return
  }
  const new_expense = {
    id: id.value++,
    date: form.date,
    title: form.title,
    amount: form.amount,
    category: form.category,
  }

  expenses.value.push(new_expense)
  form.date = ''
  form.title = ''
  form.amount = ''
  form.category = ''
}
const totalAmount = computed(() => {
  return expenses.value.reduce((total, expense) => {
    return total + Number(expense.amount)
  }, 0)
})

const totalThisMonthAmount = computed(() => {
  const thisMonth = new Date().toISOString().slice(0, 7)
  return expenses.value.reduce((total, expense) => {
    return thisMonth === expense.date.slice(0, 7) ? total + Number(expense.amount) : total
  }, 0)
})

// 今月の支出が５万円を超えたらお知らせする
watch(totalThisMonthAmount, (newAmount) => {
  if (isOver50kNotified.value === false && newAmount > 50000) {
    console.log('今月の支出が5万円を超えました')
    isOver50kNotified.value = true
  }
})

function getCategoryLabel(value) {
  const category = categories.find((category) => {
    return category.value === value
  })

  return category?.label ?? '未分類'
}
</script>
<template>
  <h2>支出を記録</h2>

  <form @submit.prevent="registerExpense">
    <div>
      <label for="date">日付</label>
      <input id="date" v-model="form.date" type="date" />
    </div>

    <div>
      <label for="title">内容</label>
      <input id="title" v-model="form.title" type="text" />
    </div>

    <div>
      <label for="amount">金額</label>
      <input id="amount" v-model="form.amount" type="number" />
    </div>

    <div>
      <label for="category">分類</label>
      <select id="category" v-model="form.category" name="category">
        <option value="">選択してください</option>

        <option v-for="category in categories" :key="category.value" :value="category.value">
          {{ category.label }}
        </option>
      </select>
    </div>
    <button type="submit">登録</button>
  </form>
  <hr />

  <h2>今月の支出{{ totalThisMonthAmount }}円</h2>
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
