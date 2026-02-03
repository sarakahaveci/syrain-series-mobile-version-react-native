import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native'
import { getImageUrl } from '../api/tmdb'

type SeriesDetails = {
  name: string
  overview: string
  poster_path: string | null
  vote_average: number
  number_of_seasons: number
  first_air_date: string
}

const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTUyMjcyNDY4NjI5Nzk4ODBmYWYwMDExNmZhYzU5MyIsIm5iZiI6MTc2OTc5MzI3Mi4xMDA5OTk4LCJzdWIiOiI2OTdjZTZmODJhN2QwY2U2NDMzM2JkNjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4-qDSWYkjZQnfRCEmyY0arGYW4jLTpu470ehAmVUn3s'

export default function SeriesDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [series, setSeries] = useState<SeriesDetails | null>(null)

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${id}?language=ar`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(setSeries)
  }, [id])

  if (!series) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="white" />
      </View>
    )
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'black' }}>
      <Image
        source={{ uri: getImageUrl(series.poster_path) ?? undefined }}
        style={{ width: '100%', height: 420 }}
      />

      <View style={{ padding: 16 }}>
        <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold' }}>
          {series.name}
        </Text>

        <Text style={{ color: '#facc15', marginVertical: 8 }}>
          ⭐ {series.vote_average.toFixed(1)} • {series.number_of_seasons} مواسم
        </Text>

        <Text style={{ color: '#a1a1aa', lineHeight: 22 }}>
          {series.overview || 'لا يوجد وصف'}
        </Text>
      </View>
    </ScrollView>
  )
}
