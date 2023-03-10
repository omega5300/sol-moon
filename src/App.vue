<script setup lang="ts">
import { ref, computed } from 'vue'

import {
  playOutline,
  pauseOutline,
  stopOutline,
  playSkipBackOutline,
  playSkipForwardOutline,
  informationCircleOutline,
} from 'ionicons/icons'

import { Howl } from 'howler'

import { timeConvert } from './data/getTime'

import { Track, trackList } from './data/audioData'

// internal
let player: Howl | null = null;

// static
const alertButtons = ['OK']
const totalTracks: number = trackList.length - 1
const info: string = `
  recopilatorio producido por mixtreria. \n\n\n
  app desarrollado por omega5300.
`

// states
const lastEmittedValue = ref(0)

const activeTrack = ref<Track>({} as Track)

const progressBar = ref(0)
const isPlaying = ref(false)

// computed
const isShowButtons = computed(
  () => Object.values(activeTrack.value).length === 0
)

const trackPosition = computed(
  () => trackList.findIndex(({ title }) => title === activeTrack.value.title)
)

const colorTrack = (track: string, current?: string) => track === current ? 'dark' : 'secondary'

const onIonChange = ({ detail }: any) => {
  lastEmittedValue.value = detail.value
}

const playMusic = (track: Track) => {
  if (player) {
    player.stop()
  }

  activeTrack.value = track

  player = new Howl({
    src: [track.url],
    html5: true,
    onplay() {
      isPlaying.value = true;
      updateProgress()
    },
    onend() {
      trackPosition.value === 7 ? stopPlayer() : nextTrack()
    }
  })

  player.play()
}

const stopPlayer = () => {
  player?.stop()

  activeTrack.value = {} as Track;
}

const togglePlayer = (pause: boolean) => {
  isPlaying.value = !pause

  pause ? player?.pause() : player?.play()
}

const nextTrack = () => {
  playMusic(trackList[trackPosition.value + 1])
}

const prevTrack = () => {
  playMusic(trackList[trackPosition.value - 1])
}

const seekTrack = () => {
  let newValue = +lastEmittedValue.value
  let duration = player?.duration() as number

  player?.seek(duration * (newValue / 100))
}

const updateProgress = () => {
  let seek = player?.seek() as number

  progressBar.value = (seek / (player?.duration() as number)) * 100 || 0

  setTimeout(() => {
    updateProgress()
  }, 1000)
}
</script>

<template>
  <ion-app>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button id="about-app">
            <ion-icon 
              slot="icon-only" 
              :icon="informationCircleOutline" 
            />
          </ion-button>
        </ion-buttons>
        <ion-title>Sol, moon</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-alert 
        trigger="about-app"
        header="sol, moon album"
        sub-header="mixtreria album"
        :message="info"
        :buttons="alertButtons"
      />

      <ion-card>
        <ion-img class="cover" src="cover.jpg" alt="album cover" />

        <ion-card-title class="ion-text-center ion-padding">
          {{ trackPosition + 1 }}. {{ activeTrack?.title || 'no title play' }}
        </ion-card-title>
      </ion-card>

      <ion-list class="scroller" inset>
        <ion-item v-for="track of trackList" :key="track.title" button @click="playMusic(track)">
          <ion-label :color="colorTrack(track.url, activeTrack?.url)">
            {{ track.title }}
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-footer v-if="!isShowButtons">
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-range aria-label="counter" v-model="progressBar" :max="100" color="dark" @ion-change="onIonChange"
              @ion-knob-move-start="seekTrack" @ion-knob-move-end="seekTrack"
            >
              <ion-text slot="start" color="secondary">
                {{ timeConvert(player?.seek() as number) }}
              </ion-text>
              <ion-text slot="end" color="secondary">
                {{ timeConvert(player?.duration() as number) }}
              </ion-text>
            </ion-range>
          </ion-col>
          <music-button :isDisabled="trackPosition === 0" :music-icon="playSkipBackOutline" @music-action="prevTrack" />
          <music-button :isDisabled="false" v-if="!isPlaying" :music-icon="playOutline" @music-action="togglePlayer(false)" />
          <music-button :isDisabled="false" v-if="isPlaying" :music-icon="pauseOutline" @music-action="togglePlayer(true)" />
          <music-button :isDisabled="false" :music-icon="stopOutline" @music-action="stopPlayer" />
          <music-button :isDisabled="trackPosition === totalTracks" :music-icon="playSkipForwardOutline" @music-action="nextTrack" />
        </ion-row>
      </ion-grid>
    </ion-footer>
  </ion-app>
</template>

<style scoped>
.cover {
  width: 210px;
  height: 210px;
  margin: 0.25rem auto;
  filter: drop-shadow(0 0 0.75rem #e3dfde);;
}

.scroller {
  height: 40%;
  overflow: auto;
}
</style>
