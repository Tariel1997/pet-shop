const RATE_API_URL = 'https://open.er-api.com/v6/latest/GEL'

interface RateApiResponse {
  result: string
  rates?: {
    USD?: number
  }
}

let cachedRate: number | null = null
let ratePromise: Promise<number> | null = null

const fetchGelToUsdRate = async (): Promise<number> => {
  if (cachedRate !== null) return cachedRate

  if (!ratePromise) {
    ratePromise = fetch(RATE_API_URL)
      .then((response) => {
        if (!response.ok) throw new Error('Currency conversion failed')
        return response.json() as Promise<RateApiResponse>
      })
      .then((payload) => {
        const rate = payload?.rates?.USD

        if (payload?.result !== 'success' || typeof rate !== 'number') {
          throw new Error('Currency conversion failed')
        }

        cachedRate = rate
        return rate
      })
      .catch((error) => {
        ratePromise = null
        throw error
      })
  }

  return ratePromise
}

const convertGelToUsd = async (amountInGel: number): Promise<number> => {
  const rate = await fetchGelToUsdRate()
  return amountInGel * rate
}

export { convertGelToUsd }
