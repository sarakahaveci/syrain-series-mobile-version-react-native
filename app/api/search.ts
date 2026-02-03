import { TMDBSeries } from './tmdb'

const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTUyMjcyNDY4NjI5Nzk4ODBmYWYwMDExNmZhYzU5MyIsIm5iZiI6MTc2OTc5MzI3Mi4xMDA5OTk4LCJzdWIiOiI2OTdjZTZmODJhN2QwY2U2NDMzM2JkNjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4-qDSWYkjZQnfRCEmyY0arGYW4jLTpu470ehAmVUn3s'

export async function searchSeries(query: string): Promise<TMDBSeries[]> {
  if (!query) return []

  const res = await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
      query
    )}&language=ar`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  )

  const data = await res.json()
  return data.results
}
