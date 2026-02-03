export type Series = {
  id: number
  title: string
  image: string
  rating?: number
  overview?: string
}

export const manualSeries: Series[] = [
  {
    id: 1,
    title: 'Al Hayba',
    image:
      'https://image.tmdb.org/t/p/w500/e1mjopzAS2KNsvpbpahQ1a6SkSn.jpg',
    rating: 4.5,
    overview: 'A powerful family drama set on the Lebanese-Syrian border.',
  },
  {
    id: 2,
    title: 'Bab Al Hara',
    image:
      'https://image.tmdb.org/t/p/w500/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg',
    rating: 4.2,
    overview: 'Classic Syrian series about life in old Damascus.',
  },
]
