
<template>
  <div class="table-card">
    <div class="table-title">
      <div>
        <h3>Market Overview</h3>
        <p>Daftar cryptocurrency berdasarkan peringkat</p>
      </div>
      <span class="live-label">
        <span class="live-dot"></span>
        Market Data
      </span>
    </div>

    <div class="table-scroll">
      <div class="table-header">
        <span>Rank</span>
        <span>Name</span>
        <span>Symbol</span>
        <span class="align-right">Price (USD)</span>
      </div>

      <div
        v-for="coin in coins"
        :key="coin.id"
        class="coin-row"
      >
        <span class="rank">#{{ coin.rank }}</span>

        <span class="coin-name">
          {{ coin.name }}
        </span>

        <span class="coin-symbol">
          {{ coin.symbol }}
        </span>

        <span class="price">
          ${{ formatPrice(coin.price_usd) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  coins: {
    type: Array,
    default: () => []
  }
})

const formatPrice = (price) => {
  const value = Number(price)

  if (!Number.isFinite(value)) {
    return '-'
  }

  return value.toLocaleString('en-US', {
    maximumFractionDigits: 8
  })
}
</script>

<style scoped>
.table-card {
  background: var(--ion-card-background);
  border: 1px solid var(--ion-border-color);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 22px;
}

.table-title {
  padding: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.table-title h3 {
  font-size: 17px;
  font-weight: 750;
  margin: 0 0 5px;
  color: var(--ion-text-color);
}

.table-title p {
  font-size: 12px;
  color: var(--ion-color-medium);
  margin: 0;
}

.live-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  white-space: nowrap;
  color: var(--ion-color-success);
  font-weight: 600;
}

.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ion-color-success);
}

.table-scroll {
  overflow-x: auto;
}

.table-header,
.coin-row {
  display: grid;
  grid-template-columns: 0.65fr 1.5fr 0.8fr 1.3fr;
  gap: 12px;
  align-items: center;
  min-width: 460px;
  padding: 14px 18px;
}

.table-header {
  background: var(--ion-item-background);
  color: var(--ion-color-medium);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.coin-row {
  min-height: 58px;
  border-top: 1px solid var(--ion-border-color);
  color: var(--ion-text-color);
  font-size: 13px;
  transition: background 0.2s;
}

.coin-row:hover {
  background: var(--ion-item-background);
}

.rank {
  color: var(--ion-color-medium);
  font-weight: 600;
}

.coin-name {
  font-weight: 650;
}

.coin-symbol {
  color: var(--ion-color-medium);
  font-size: 12px;
  font-weight: 600;
}

.price {
  text-align: right;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  overflow-wrap: anywhere;
}

.align-right {
  text-align: right;
}
</style>
