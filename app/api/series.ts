export type Series = {
    id: number
    title: string
    image: string
    rating?: number
    description?: string
  }
  
  const BASE_URL = ''
  
  export async function fetchSeries(): Promise<Series[]> {
    const res = await fetch(`${BASE_URL}/series`)
  
    if (!res.ok) {
      throw new Error('Failed to fetch series')
    }
  
    return res.json()
  }
  
  export async function fetchSeriesById(id: string): Promise<Series> {
    const res = await fetch(`${BASE_URL}/series/${id}`)
  
    if (!res.ok) {
      throw new Error('Failed to fetch series')
    }
  
    return res.json()
  }
  