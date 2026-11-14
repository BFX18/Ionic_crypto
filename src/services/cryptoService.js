import axios from 'axios'

const API_URL = 'https://api.coinlore.net/api/tickers/'

export const getCryptoData = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data.data
  } catch (error) {
    console.error('Gagal mengambil data:', error)
    throw error
  }
}
