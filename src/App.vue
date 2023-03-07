<script setup lang="ts">
import { Howl, Howler } from 'howler';

import { audioData } from './data/audioData';

const sound = new Howl({
  src: audioData,
  html5: true,
});

sound.play();
</script>

<template>
  <ion-app>
    <ion-content class="ion-padding">
      <h1>holi</h1>
    </ion-content>
  </ion-app>
</template>
