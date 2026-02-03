export type TMDBSeries = {
    id: number
    name: string
    poster_path: string | null
    vote_average: number
    overview: string
  }
  
  const BASE_URL = 'https://api.themoviedb.org/3'
  
  const TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTUyMjcyNDY4NjI5Nzk4ODBmYWYwMDExNmZhYzU5MyIsIm5iZiI6MTc2OTc5MzI3Mi4xMDA5OTk4LCJzdWIiOiI2OTdjZTZmODJhN2QwY2U2NDMzM2JkNjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4-qDSWYkjZQnfRCEmyY0arGYW4jLTpu470ehAmVUn3s'
  
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  }
  
  export async function fetchPopularSeries(): Promise<TMDBSeries[]> {
    const res = await fetch(`${BASE_URL}/tv/popular?language=ar`, {
      headers,
    })
  
    if (!res.ok) {
      throw new Error('Failed to fetch series')
    }
  
    const data = await res.json()
    return data.results
  }
  
  export function getImageUrl(path: string | null) {
    if (!path) return null
    return `https://image.tmdb.org/t/p/w500${path}`
  }
  