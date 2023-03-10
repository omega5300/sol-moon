<template>
  <ion-col size="3">
    <ion-button 
      expand="block" 
      fill="clear" 
      @click="emits('musicAction')"
      color="dark"
      :disabled="isDisabled"
    >
      <ion-icon slot="icon-only" :icon="musicIcon" />
    </ion-button>
  </ion-col>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: 'musicAction'): void
}>()

const { musicIcon, isDisabled } = defineProps<{
  musicIcon: string,
  isDisabled: boolean
}>()
</script>
