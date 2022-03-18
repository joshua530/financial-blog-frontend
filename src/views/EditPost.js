import PostForm from '../components/PostForm';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';

const EditPost = () => {
  const { slug } = useParams();
  const endpoint = `${process.env.REACT_APP_API_URL}/posts/${slug}`;
  const user = localStorage.getItem('userSlug');
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [postExists, setPostExists] = useState(true);
  const [userOwnsPost, setUserOwnsPost] = useState(true);
  const [postFetched, setPostFetched] = useState(false);

  useEffect(() => {
    if (!postFetched) {
      fetchPostDetails();
    } else {
      if (!postExists) {
        navigate('/404');
      } else if (!userOwnsPost) {
        navigate('/403');
      }
    }
  }, [postExists, userOwnsPost]);

  const fetchPostDetails = () => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setPostExists(false);
          return;
        } else if (user !== data.post.userSlug) {
          setUserOwnsPost(false);
          return;
        } else {
          setPost(data.post);
        }
        setPostFetched(true);
      });
  };

  return post ? <PostForm isNewPost={false} post={post} /> : <Spinner />;
};

export default EditPost;
