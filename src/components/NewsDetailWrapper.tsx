import React from 'react'
import { useParams } from 'react-router-dom'
import NewsDetailPage from '../app/news/[id]/page'

const NewsDetailWrapper = () => {
  const { id } = useParams()
  
  if (!id) {
    return <div>News not found</div>
  }

  return <NewsDetailPage params={Promise.resolve({ id })} />
}

export default NewsDetailWrapper 