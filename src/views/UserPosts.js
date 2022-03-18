import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { indexPost } from '../actions/posts';

const mapDispatchToProps = (dispatch) => {
  return { indexPost: (post) => dispatch(indexPost(post)) };
};

function UserPosts({ indexPost }) {
  const [userPosts, setUserPosts] = useState(null);
  const [username, setUsername] = useState('');
  const [userSlug, setUserSlug] = useState('');
  const { slug } = useParams();

  useEffect(() => {
    fetchUser();
    fetchUserPosts();
  }, []);

  const fetchUser = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/profile/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
        setUserSlug(data.slug);
      })
      .catch((err) => console.log(err));
  };

  const fetchUserPosts = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/posts/users/${slug}`)
      .then((response) => response.json())
      .then((posts) => {
        posts.forEach((p) => indexPost(p));
        setUserPosts(posts);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mt-2">
      <h4>
        Posts by{' '}
        {userSlug !== '' && username !== '' ? (
          <Link to={`/profile/${userSlug}`}>{username}</Link>
        ) : (
          <Spinner />
        )}
      </h4>
      {userPosts ? (
        userPosts.length === 0 ? (
          <p>User has no posts</p>
        ) : (
          userPosts.map((post) => (
            <div key={post.id} className="card my-2 post">
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/posts/view/${post.slug}`}>{post.title}</Link>
                </h5>
                <div className="card-text">{parse(post.content)}</div>
              </div>
            </div>
          ))
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default connect(null, mapDispatchToProps)(UserPosts);
