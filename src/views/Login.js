import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { authenticate } from '../actions/authentication';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: (authToken, userSlug) =>
      dispatch(authenticate(authToken, userSlug))
  };
};

function Login({ authenticateUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const alert = useAlert();
  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();

    if (!username) {
      alert.error('username cannot be empty');
      return;
    }
    if (!password) {
      alert.error('password cannot be empty');
      return;
    }
    const user = { username, password };

    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
          return;
        }
        authenticateUser(data.token, data.slug);
        navigate('/');
      });
  };

  return (
    <div className="d-flex justify-content-center row">
      <form onSubmit={loginUser} className="mx-2 col-md-8 col-lg-6 mt-5 mb-5">
        <div className="form-section">
          <label htmlFor="username">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="form-control"
            id="username"
          />
        </div>
        <div className="form-section">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <button type=" submit" className="border-0 btn btn-primary btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
}

const ConnectedLogin = connect(null, mapDispatchToProps)(Login);

export default ConnectedLogin;
