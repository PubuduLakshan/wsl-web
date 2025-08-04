import React from 'react'
import { useRoute } from 'wouter'
import NewsDetailPage from '../app/news/[id]/page'

const NewsDetailWrapper = () => {
  const [, params] = useRoute('/news/:id')
  
  if (!params || !params.id) {
    return <div>News not found</div>
  }

  return <NewsDetailPage params={Promise.resolve({ id: params.id })} />
}

export default NewsDetailWrapper 