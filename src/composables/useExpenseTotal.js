import { computed } from 'vue'

export function useExpenseTotal(expenses) {
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

  return { totalAmount, totalThisMonthAmount }
}
