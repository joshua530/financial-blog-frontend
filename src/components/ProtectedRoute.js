import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const mapStateToProps = (state) => {
  return { authenticated: state.auth.isAuthenticated };
};

function ProtectedRoute({ children, authenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate('/');
    }
  }, [authenticated]);

  return children;
}

export default connect(mapStateToProps)(ProtectedRoute);
