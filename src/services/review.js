import Client from './api'
export const PostReview = async (data) => {
  try {
    const res = await Client.post('/api/review', data)
    return res.data
  } catch (error) {
    throw error
  }
}
