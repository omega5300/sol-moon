<script setup lang="ts">
import { ref, computed } from 'vue'

import {
  playOutline,
  pauseOutline,
  stopOutline,
  playSkipBackOutline,
  playSkipForwardOutline,
} from 'ionicons/icons'

import { Howl, Howler } from 'howler'

import { Track, trackList } from './data/audioData'

// internal
let player: Howl | null = null;

// states
const activeTrack = ref<Partial<Track>>({})
const progressBar = ref(0)
const isPlaying = ref(false)

// computed
const isShowButtons = computed(
  () => Object.values(activeTrack.value).length === 0
)

const colorTrack = (track: string, current: string) => track === current ? 'dark' : 'secondary'

const playMusic = (track: Track) => {
  if(player) {
    player.stop()
  }
  
  player = new Howl({
    src: [track.url],
    html5: true,
    onplay() {
      isPlaying.value = true;
      activeTrack.value = track;
    },
  })
  
  player.play()
}

const stopPlayer = () => {
  player?.stop()
  
  activeTrack.value = {};
}

const togglePlayer = (pause: boolean) => {
  isPlaying.value = !pause
  
  pause ? player?.pause() : player?.play()
}

const nextTrack = () => {
  let index = trackList.indexOf(activeTrack.value)
  
  index !== trackList.length - 1
    ? playMusic(trackList[index + 1]) 
    : playMusic(trackList[0])
}

const prevTrack = () => {
  let index = trackList.indexOf(activeTrack.value)
  
  index > 0 
    ? playMusic(trackList[index - 1]) 
    : playMusic(trackList[trackList.length - 1])
}

const seekTrack = () => {}

const updateProgress = () => {}
</script>

<template>
  <ion-app>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-img src="" alt="album cover" />
          <ion-card-title class="ion-text-center">
            {{ activeTrack.title || 'no title play' }}
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item 
              v-for="track of trackList" 
              :key="track.title"
              button
              @click="playMusic(track)"
            >
              <ion-label :color="colorTrack(track.url, activeTrack?.url)">
                {{ track.title }}
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>

    <ion-footer v-if="!isShowButtons">
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-range 
              aria-label="counter"
              v-model="progressBar"
              max="100"
              color="dark"
            />
          </ion-col>
          <music-button 
            :music-icon="playSkipBackOutline" 
            @music-action="prevTrack" 
          />
          <music-button 
            v-if="!isPlaying"
            :music-icon="playOutline" 
            @music-action="togglePlayer(false)" 
          />
          <music-button 
            v-if="isPlaying"
            :music-icon="pauseOutline" 
            @music-action="togglePlayer(true)" 
          />
          <music-button 
            :music-icon="stopOutline" 
            @music-action="stopPlayer" 
          />
          <music-button 
            :music-icon="playSkipForwardOutline" 
            @music-action="nextTrack" 
          />
        </ion-row>
      </ion-grid>
    </ion-footer>
  </ion-app>
</template>
