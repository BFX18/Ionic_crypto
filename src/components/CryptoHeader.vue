
<template>
  <ion-header class="app-header">
    <ion-toolbar>
      <ion-title>
        <div class="brand">
          <ion-icon :icon="logoBitcoin" />
          <span>CryptoList</span>
        </div>
      </ion-title>

      <ion-buttons slot="end">
        <ion-button
          @click="$emit('toggle-theme')"
          aria-label="Ganti tema"
        >
          <ion-icon
            :icon="darkMode ? sunnyOutline : moonOutline"
          />
        </ion-button>

        <ion-button
          @click="$emit('refresh')"
          :disabled="loading"
          aria-label="Refresh data"
        >
          <ion-spinner
            v-if="loading"
            name="crescent"
          />
          <ion-icon
            v-else
            :icon="refreshOutline"
          />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup>
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonSpinner,
  IonIcon
} from '@ionic/vue'

import {
  logoBitcoin,
  moonOutline,
  sunnyOutline,
  refreshOutline
} from 'ionicons/icons'

defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  darkMode: {
    type: Boolean,
    default: false
  }
})

defineEmits(['refresh', 'toggle-theme'])
</script>

<style scoped>
.app-header ion-toolbar {
  --background: var(--ion-toolbar-background);
  --border-width: 0;
  padding: 5px 8px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 9px;
  font-weight: 750;
  letter-spacing: -0.4px;
}

.brand ion-icon {
  font-size: 25px;
  color: var(--ion-color-primary);
}
</style>
