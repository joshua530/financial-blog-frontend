import { useState } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passConfirmation, setPassConfirmation] = useState('');
  const navigate = useNavigate();

  const alert = useAlert();

  const submitForm = (e) => {
    e.preventDefault();

    if (!username) {
      alert.error('username cannot be empty');
      return;
    }

    if (!email) {
      alert.error('email cannot be empty');
      return;
    }

    if (!password) {
      alert.error('password cannot be empty');
      return;
    }

    if (!passConfirmation) {
      alert.error('confirmation password cannot be empty');
      return;
    }

    if (password.length < 8) {
      alert.error('password must be at least 8 characters long');
      return;
    }

    if (password !== passConfirmation) {
      alert.error('password does not match password confirmation');
      return;
    }

    const user = { username, email, password };

    fetch(`${process.env.REACT_APP_API_URL}/sign-up`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          alert.success('account created successfully. login to continue');
          navigate('/login');
        }
        return response.json();
      })
      .then((response) => {
        if (response.error) alert.error(response.error);
      });
  };

  return (
    <div className="d-flex justify-content-center row">
      <form onSubmit={submitForm} className="mx-2 col-md-8 col-lg-6 mt-5 mb-5">
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
          <label htmlFor="password">Password</label>
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
            value={passConfirmation}
            onChange={(e) => setPassConfirmation(e.target.value)}
            type="password"
            className="form-control"
            id="password-confirm"
          />
        </div>
        <button type=" submit" className="border-0 btn btn-primary btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;
