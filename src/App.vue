<script setup lang="ts">
import { Howl, Howler } from 'howler';

import { audioData } from './data/audioData';

const sound = new Howl({
  src: audioData,
  html5: true,
});

const playMusic = () => {
  sound.play();
};

/* const pauseMusic = () => {
  sound.
}; */
</script>

<template>
  <ion-app>
    <ion-content class="ion-padding">
      <h1>holi</h1>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-title>Footer Toolbar</ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-app>
</template>
