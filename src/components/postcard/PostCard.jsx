import React from 'react'
import { Link } from 'react-router-dom'
import service from '../../appwrite/conf'

function PostCard({$id,title, images}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-5'>
            <img src={service.getFilePreview(images)} alt={title} className='rounded-xl' />
        </div>
        <h2 className='text-xl font-bold text-gray-200'>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
