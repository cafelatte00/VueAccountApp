<script setup>
const props = defineProps({
  message: String,
})
</script>
<template>
  <div class="message">
    <button @click="$emit('closeNotice')">x</button>
    <p class="text-center">{{ props.message }}</p>
  </div>
</template>
<style scoped>
.message {
  background-color: powderblue;
  border-radius: 10px;
  width: 500px;
}
</style>
