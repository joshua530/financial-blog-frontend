import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  userSlug: state.auth.userSlug,
  authToken: state.auth.authToken
});

function UpdateProfile({ userSlug, authToken }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const detailsEndpoint = `${process.env.REACT_APP_API_URL}/profile/${slug}`;
  const updateEndpoint = `${process.env.REACT_APP_API_URL}/profile/${userSlug}/update`;
  const alert = useAlert();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [detailsFetched, setDetailsFetched] = useState(false);
  const [updateCompleted, setUpdateCompleted] = useState(false);

  const fetchUserDetails = () =>
    fetch(detailsEndpoint)
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username);
        setEmail(data.email);
      })
      .catch((e) => console.log(e));

  const updateProfile = (e) => {
    e.preventDefault();
    setUsername(username.trim());
    setEmail(email.trim());

    if (!username) {
      alert.error('username cannot be empty');
      return;
    }
    if (!email) {
      alert.error('email is empty');
      return;
    }
    const data = { username, email, token: authToken };
    fetch(updateEndpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
        } else {
          setUpdateCompleted(true);
          alert.success('profile updated');
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (userSlug !== slug) {
      navigate('/403');
    }
    if (!detailsFetched) {
      fetchUserDetails();
      setDetailsFetched(true);
    }
    if (updateCompleted) {
      navigate(`/profile/${userSlug}`);
    }
  }, [updateCompleted]);

  return (
    <div className="d-flex justify-content-center row">
      <form
        onSubmit={updateProfile}
        className="mx-2 col-md-8 col-lg-6 mt-5 mb-5"
      >
        <div className="form-section">
          <label htmlFor="username">Username</label>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            className="form-control"
            id="username"
          />
        </div>
        <div className="form-section">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="email"
          />
        </div>
        <div className="form-section">
          <Link to={`/profile/${userSlug}/update-password`}>
            <span className="fa fa-lock me-1"></span>Update password
          </Link>
        </div>
        <button type=" submit" className="border-0 btn btn-primary btn-submit">
          Update profile
        </button>
      </form>
    </div>
  );
}

export default connect(mapStateToProps)(UpdateProfile);
