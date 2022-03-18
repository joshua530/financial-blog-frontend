import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';

const mapStateToProps = (state) => ({
  userSlug: state.auth.userSlug,
  authToken: state.auth.authToken
});

function UpdatePassword({ userSlug, authToken }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const alert = useAlert();
  const endpoint = `${process.env.REACT_APP_API_URL}/profile/${userSlug}/update-password`;

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const updatePassword = (e) => {
    e.preventDefault();
    setPassword(password.trim());
    setPasswordConfirmation(passwordConfirmation.trim());
    if (!password) {
      alert.error('password cannot be empty');
      return;
    }
    if (password.length < 8) {
      alert.error('password must be at least 8 characters long');
      return;
    }
    if (!passwordConfirmation) {
      alert.error('password confirmation cannot be empty');
      return;
    }
    if (password !== passwordConfirmation) {
      alert.error('password does not equal password confirmation');
      return;
    }

    const data = { password, token: authToken };
    fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200) {
          return res.json();
        }
        return true;
      })
      .then((data) => {
        if (data === true) {
          alert.success('password updated successfully');
          setPasswordUpdated(true);
        } else if (data.error) {
          alert.error(data.error);
        } else {
          console.log(data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (slug !== userSlug) {
      navigate('/403');
    }
    if (passwordUpdated) {
      navigate(`/profile/${userSlug}`);
    }
  }, [passwordUpdated]);

  return (
    <div className="d-flex justify-content-center row">
      <form
        onSubmit={updatePassword}
        className="mx-2 col-md-8 col-lg-6 mt-5 mb-5"
      >
        <div className="form-section">
          <label htmlFor="password">New password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <div className="form-section">
          <label htmlFor="password-confirm">Confirm password</label>
          <input
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            type="password"
            className="form-control"
            id="password-confirm"
          />
        </div>
        <button type=" submit" className="border-0 btn btn-primary btn-submit">
          Update password
        </button>
      </form>
    </div>
  );
}

export default connect(mapStateToProps)(UpdatePassword);
