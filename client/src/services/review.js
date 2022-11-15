import Client from './api'
export const PostReview = async () => {
  try {
    const post = await Client.post({ ...req.body })
    return res.data
  } catch (error) {
    throw error
  }
}
