import { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';
import Post from '../components/Post';

const Posts = () => {
  const { posts } = useContext(PostsContext) || { posts: [] };

  return (
    <div className='posts-page'>
      <div className='container'>
        <div className='posts-container'>
          {posts?.map((post) => {
              return (
                <Post post={post} key={post.id} />
              )
          })}
        </div>
      </div>
    </div>
  )
}

export default Posts;