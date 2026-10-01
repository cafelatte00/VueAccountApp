import { ref, watch, onMounted } from 'vue'

export function useExpenseAlert(totalThisMonthAmount, shouldNotify) {
  // 支出が５万円以上のアラートを表示しているか
  const isOver50kNotified = ref(false)
  // アラートの表示・非表示の状態
  const isExpenseAlertVisible = ref(false)

  // 今月の支出が５万円を超えたらお知らせする
  watch(totalThisMonthAmount, (newAmount) => {
    if (shouldNotify.value && isOver50kNotified.value === false && newAmount >= 50000) {
      isExpenseAlertVisible.value = true
      isOver50kNotified.value = true
    }
  })

  return {
    isExpenseAlertVisible,
  }
}
