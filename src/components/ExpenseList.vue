<script setup>
import { ref, reactive, onMounted } from 'vue'
import { categories } from '@/constants/categories'
import ExpenseAlert from './ExpenseAlert.vue'
import { useExpenseTotal } from '@/composables/useExpenseTotal'
import { useExpenseAlert } from '@/composables/useExpenseAlert'

const expenses = ref([])

const { totalAmount, totalThisMonthAmount } = useExpenseTotal(expenses)

const id = ref(1)

const form = reactive({
  date: '',
  title: '',
  amount: '',
  category: '',
})
// 通知するかどうか
const shouldNotify = ref(false)

onMounted(() => {
  shouldNotify.value = confirm('5万円を超えたら通知しますか？')
})

// 5万円を超えた時の通知処理
const { isExpenseAlertVisible } = useExpenseAlert(totalThisMonthAmount, shouldNotify)

const alertMessage = '今月の支出が５万円を超えました'

// 支出の登録
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

function getCategoryLabel(value) {
  const category = categories.find((category) => {
    return category.value === value
  })

  return category?.label ?? '未分類'
}

function closeNoticePanel() {
  isExpenseAlertVisible.value = false
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

  <h2>今月の支出:{{ totalThisMonthAmount }}円</h2>
  <ExpenseAlert
    v-show="isExpenseAlertVisible"
    :message="alertMessage"
    @close-notice="closeNoticePanel"
  />
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
