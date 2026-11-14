
<template>
  <ion-footer class="app-footer">
    <ion-toolbar>
      <div class="footer-content">
        <p>
          Data disediakan oleh
          <a
            href="https://www.coinlore.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Coinlore
          </a>
        </p>
        <span>CryptoList · MSIM4401</span>
      </div>
    </ion-toolbar>
  </ion-footer>
</template>

<script setup>
import {
  IonFooter,
  IonToolbar
} from '@ionic/vue'
</script>

<style scoped>
.app-footer ion-toolbar {
  --background: var(--ion-toolbar-background);
  --border-width: 0;
}

.footer-content {
  text-align: center;
  padding: 12px 8px;
  border-top: 1px solid var(--ion-border-color);
}

.footer-content p {
  margin: 0 0 5px;
  font-size: 12px;
  color: var(--ion-color-medium);
}

.footer-content a {
  color: var(--ion-color-primary);
  text-decoration: none;
  font-weight: 600;
}

.footer-content span {
  font-size: 11px;
  color: var(--ion-color-medium);
}
</style>
