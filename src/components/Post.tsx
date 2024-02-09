import { useContext, useState } from 'react';
import { PostsContext } from '../context/PostsContext';

import Comments from './Comments';

interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  const { posts, users, comments, searchQuery } = useContext(PostsContext) || { users: [], comments: [], searchQuery: '' };
  const [expandedPost, setExpandedPost] = useState(false);
  const [expandedComments, setExpandedComments] = useState(false);

  const findUser = (userId: number) => {
    return users.find(user => user.id === userId);
  }

  const findComment = (postId: number) => {
    return comments.filter(comment => comment.postId === postId);
  }

  const togglePostDetails = () => {
    setExpandedPost(!expandedPost);
  }

  const toggleComments = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setExpandedComments(!expandedComments);
  }

  const user = findUser(post.userId);
  const postComments = findComment(post.id);

  const isMatch = user?.name.toLowerCase().includes(searchQuery.toLowerCase());

  if (!isMatch) {
    return null;
  }

  console.log(posts, 'posts')
  console.log(comments, 'comments')

  return (
    <div className='post' onClick={togglePostDetails}>
      <h4 className='post-title'>{post.title}</h4>
      <div className='post-info'>
        <h6 className='post-author'>
          <svg width="26px" height="26px" className='author-icon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 19.2857L15.8 21L20 17M16.5 14.4018C16.2052 14.2315 15.8784 14.1098 15.5303 14.0472C15.4548 14.0337 15.3748 14.024 15.2842 14.0171C15.059 14 14.9464 13.9915 14.7961 14.0027C14.6399 14.0143 14.5527 14.0297 14.4019 14.0723C14.2569 14.1132 13.9957 14.2315 13.4732 14.4682C12.7191 14.8098 11.8817 15 11 15C10.1183 15 9.28093 14.8098 8.52682 14.4682C8.00429 14.2315 7.74302 14.1131 7.59797 14.0722C7.4472 14.0297 7.35983 14.0143 7.20361 14.0026C7.05331 13.9914 6.94079 14 6.71575 14.0172C6.6237 14.0242 6.5425 14.0341 6.46558 14.048C5.23442 14.2709 4.27087 15.2344 4.04798 16.4656C4 16.7306 4 17.0485 4 17.6841V19.4C4 19.9601 4 20.2401 4.10899 20.454C4.20487 20.6422 4.35785 20.7951 4.54601 20.891C4.75992 21 5.03995 21 5.6 21H10.5M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span className='author-name'>{user?.name}</span>
        </h6>
        <h6 className='comments-info'>
          <svg
            className='comments-icon'
            onClick={toggleComments}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="23px"
            height="23px"
          >
            <path d="M 16 3 C 12.210938 3 8.765625 4.113281 6.21875 5.976563 C 3.667969 7.835938 2 10.507813 2 13.5 C 2 17.128906 4.472656 20.199219 8 22.050781 L 8 29 L 14.746094 23.9375 C 15.15625 23.96875 15.570313 24 16 24 C 19.789063 24 23.234375 22.886719 25.78125 21.027344 C 28.332031 19.164063 30 16.492188 30 13.5 C 30 10.507813 28.332031 7.835938 25.78125 5.976563 C 23.234375 4.113281 19.789063 3 16 3 Z M 16 5 C 19.390625 5 22.445313 6.015625 24.601563 7.589844 C 26.757813 9.164063 28 11.246094 28 13.5 C 28 15.753906 26.757813 17.835938 24.601563 19.410156 C 22.445313 20.984375 19.390625 22 16 22 C 15.507813 22 15.015625 21.972656 14.523438 21.925781 L 14.140625 21.894531 L 10 25 L 10 20.859375 L 9.421875 20.59375 C 6.070313 19.019531 4 16.386719 4 13.5 C 4 11.246094 5.242188 9.164063 7.398438 7.589844 C 9.554688 6.015625 12.609375 5 16 5 Z" />
          </svg>
          <span className='comments-number'>({postComments.length})</span>
        </h6>
      </div>
      {expandedPost &&
        <>
          <p className='post-body'>{post.body}</p>
          {expandedComments && <Comments comments={postComments} />}
        </>
      }
    </div>
  )
}

export default Post;