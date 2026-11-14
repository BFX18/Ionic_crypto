
<template>
  <ion-page>
    <CryptoHeader
      :loading="loading"
      :dark-mode="darkMode"
      @refresh="loadCrypto"
      @toggle-theme="toggleTheme"
    />

    <ion-content class="main-content">
      <div class="page-container">

        <section class="welcome">
          <div>
            <p class="eyebrow">CRYPTOCURRENCY TRACKER</p>
            <h1>Market Overview</h1>
            <p class="subtitle">
              Informasi harga cryptocurrency dalam USD.
            </p>
          </div>

          <div class="market-icon">
            <ion-icon :icon="statsChartOutline" />
          </div>
        </section>

        <section class="summary-grid">
          <div class="summary-card">
            <div class="summary-icon blue">
              <ion-icon :icon="layersOutline" />
            </div>
            <div>
              <p>Data diterima</p>
              <h2>{{ cryptoList.length }}</h2>
              <span>Cryptocurrency</span>
            </div>
          </div>

          <div class="summary-card">
            <div class="summary-icon green">
              <ion-icon :icon="globeOutline" />
            </div>
            <div>
              <p>Sumber data</p>
              <h2>Coinlore</h2>
              <span>Online API</span>
            </div>
          </div>
        </section>

        <div v-if="loading" class="status-card">
          <ion-spinner name="crescent" />
          <p>Mengambil data cryptocurrency...</p>
        </div>

        <div v-if="errorMessage" class="error-card">
          <ion-icon :icon="alertCircleOutline" />
          <p>{{ errorMessage }}</p>
          <ion-button size="small" @click="loadCrypto">
            Coba Lagi
          </ion-button>
        </div>

        <CryptoTable
          v-if="!loading && cryptoList.length > 0"
          :coins="cryptoList"
        />

        <div
          v-if="!loading && !cryptoList.length && !errorMessage"
          class="status-card"
        >
          <p>Belum ada data cryptocurrency.</p>
        </div>

        <p class="update-note" v-if="!loading && cryptoList.length">
          <ion-icon :icon="informationCircleOutline" />
          Tekan tombol refresh untuk mengambil ulang data.
        </p>

      </div>
    </ion-content>

    <CryptoFooter />
  </ion-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import {
  IonPage,
  IonContent,
  IonIcon,
  IonSpinner,
  IonButton
} from '@ionic/vue'

import {
  statsChartOutline,
  layersOutline,
  globeOutline,
  alertCircleOutline,
  informationCircleOutline
} from 'ionicons/icons'

import CryptoHeader from '../components/CryptoHeader.vue'
import CryptoTable from '../components/CryptoTable.vue'
import CryptoFooter from '../components/CryptoFooter.vue'

import { getCryptoData } from '../services/cryptoService'

const cryptoList = ref([])
const loading = ref(false)
const errorMessage = ref('')

const darkMode = ref(
  localStorage.getItem('cryptolist-theme') === 'dark'
)

const applyTheme = () => {
  document.body.classList.toggle('dark', darkMode.value)

  localStorage.setItem(
    'cryptolist-theme',
    darkMode.value ? 'dark' : 'light'
  )
}

const toggleTheme = () => {
  darkMode.value = !darkMode.value
  applyTheme()
}

const loadCrypto = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    cryptoList.value = await getCryptoData()
  } catch (error) {
    errorMessage.value =
      'Gagal mengambil data. Periksa koneksi internet dan coba lagi.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  applyTheme()
  loadCrypto()
})
</script>

<style scoped>
.main-content {
  --background: var(--ion-background-color);
}

.page-container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 20px 35px;
}

.welcome {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin: 10px 0 25px;
}

.eyebrow {
  color: var(--ion-color-primary);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.2px;
  margin: 0 0 8px;
}

.welcome h1 {
  font-size: clamp(24px, 5vw, 32px);
  font-weight: 800;
  letter-spacing: -0.8px;
  color: var(--ion-text-color);
  margin: 0;
}

.subtitle {
  color: var(--ion-color-medium);
  font-size: 14px;
  margin: 8px 0 0;
}

.market-icon {
  width: 54px;
  height: 54px;
  flex-shrink: 0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--ion-card-background);
  border: 1px solid var(--ion-border-color);

  color: var(--ion-color-medium);
  font-size: 25px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 18px;
  min-width: 0;
  background: var(--ion-card-background);
  border: 1px solid var(--ion-border-color);
  border-radius: 16px;
}

.summary-icon {
  width: 43px;
  height: 43px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 21px;
}

.summary-icon.blue {
  background: rgba(56, 128, 255, 0.13);
  color: #3880ff;
}

.summary-icon.green {
  background: rgba(45, 190, 120, 0.13);
  color: #20a56b;
}

.summary-card p {
  font-size: 12px;
  color: var(--ion-color-medium);
  margin: 0 0 5px;
}

.summary-card h2 {
  font-size: 19px;
  font-weight: 800;
  color: var(--ion-text-color);
  margin: 0 0 3px;
  overflow-wrap: anywhere;
}

.summary-card span {
  font-size: 11px;
  color: var(--ion-color-medium);
}

.status-card,
.error-card {
  margin-top: 20px;
  padding: 25px;
  border-radius: 14px;
  text-align: center;
  background: var(--ion-card-background);
  border: 1px solid var(--ion-border-color);
  color: var(--ion-text-color);
}

.status-card ion-spinner {
  width: 30px;
  height: 30px;
  color: var(--ion-color-primary);
}

.status-card p,
.error-card p {
  font-size: 13px;
  color: var(--ion-color-medium);
}

.error-card ion-icon {
  font-size: 28px;
  color: var(--ion-color-danger);
}

.update-note {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--ion-color-medium);
  margin-top: 14px;
}

@media (max-width: 520px) {
  .page-container {
    padding: 20px 12px 25px;
  }

  .summary-grid {
    gap: 9px;
  }

  .summary-card {
    padding: 12px 9px;
    gap: 8px;
  }

  .summary-icon {
    width: 35px;
    height: 35px;
    font-size: 18px;
  }

  .summary-card h2 {
    font-size: 16px;
  }

  .summary-card p {
    font-size: 11px;
  }
}

@media (min-width: 768px) {
  .page-container {
    padding-top: 35px;
  }

  .summary-grid {
    max-width: 600px;
  }
}
</style>
