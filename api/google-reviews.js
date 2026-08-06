export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) {
    return res.status(500).json({
      error: 'Google reviews are not configured. Add GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID.',
    })
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': [
            'displayName',
            'attributions',
            'rating',
            'userRatingCount',
            'googleMapsUri',
            'reviews',
          ].join(','),
        },
      },
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Google Places API error:', data)
      return res.status(response.status).json({
        error: data?.error?.message || 'Unable to load Google reviews.',
      })
    }

    // Google Places content generally cannot be cached or stored.
    res.setHeader('Cache-Control', 'no-store')

    return res.status(200).json({
      businessName: data.displayName?.text || 'Ace Cleaning',
      rating: data.rating ?? null,
      userRatingCount: data.userRatingCount ?? null,
      googleMapsUri: data.googleMapsUri || null,
      attributions: (data.attributions || []).map((item) => ({
        provider: item.provider || '',
        providerUri: item.providerUri || null,
      })),
      reviews: (data.reviews || []).map((review) => ({
        id: review.name || review.googleMapsUri || `${review.publishTime}-${review.rating}`,
        rating: review.rating ?? null,
        text: review.text?.text || '',
        originalText: review.originalText?.text || '',
        relativePublishTimeDescription: review.relativePublishTimeDescription || '',
        publishTime: review.publishTime || null,
        googleMapsUri: review.googleMapsUri || null,
        flagContentUri: review.flagContentUri || null,
        author: {
          displayName: review.authorAttribution?.displayName || 'Google user',
          uri: review.authorAttribution?.uri || null,
          photoUri: review.authorAttribution?.photoUri || null,
        },
      })),
      orderingNotice: 'Showing up to 3 reviews selected by Google and ordered by relevance.',
    })
  } catch (error) {
    console.error('Google reviews request failed:', error)
    return res.status(500).json({ error: 'Unable to load Google reviews.' })
  }
}
