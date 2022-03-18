import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  userSlug: state.auth.userSlug
});

function Profile({ userSlug }) {
  const { slug } = useParams();

  const [user, setUser] = useState({});
  const [userOwnsPost, setUserOwnsPost] = useState(false);

  useEffect(() => {
    if (userSlug === slug) {
      setUserOwnsPost(true);
    }
    fetchUser();
  }, []);

  const fetchUser = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/profile/${slug}`)
      .then((response) => response.json())
      .then((user) => setUser(user))
      .catch((e) => console.log(e));
  };

  return (
    <div className="d-flex justify-content-center row">
      <div className="col-lg-6 col-md-8">
        <div className="d-flex flex-column flex-sm-row justify-content-between mb-4">
          {user.username ? (
            <>
              <h2 className="text-capitalize">
                {`${user.username}`}'s <small>profile</small>
              </h2>
              {userOwnsPost && (
                <Link
                  to={`/profile/${user.slug}/update`}
                  className="mt-2 mt-sm-0"
                >
                  <span className="fa fa-pencil me-1"></span>
                  <span>Edit profile</span>
                </Link>
              )}
            </>
          ) : (
            <Spinner />
          )}
        </div>
        <div>
          <h2>Username</h2>
          {user.username ? (
            <>
              <p>{user.username}</p>
            </>
          ) : (
            <Spinner />
          )}
        </div>
        <div>
          <h2>Email</h2>
          {user.email ? (
            <>
              <p>{user.email}</p>
            </>
          ) : (
            <Spinner />
          )}
        </div>
        <div className="pt-3">
          <p>
            Number of posts:{' '}
            {user.numPosts !== null || user.numPosts !== undefined ? (
              user.numPosts
            ) : (
              <Spinner />
            )}
          </p>
        </div>
        <div>
          <Link to={`/posts/users/${user.slug}`}>View posts</Link>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Profile);
