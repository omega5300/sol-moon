<template>
  <ion-col size="3">
    <ion-button 
      expand="block" 
      fill="clear" 
      @click="emits('musicAction')"
      color="dark"
    >
      <ion-icon slot="icon-only" :icon="musicIcon" />
    </ion-button>
  </ion-col>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: 'musicAction', id: any): void
}>()

const { musicIcon } = defineProps<{
  musicIcon: string
}>()
</script>
