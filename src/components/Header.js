import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deauthenticate } from '../actions/authentication';

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userSlug: state.auth.userSlug
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deauthenticateUser: () => dispatch(deauthenticate())
  };
};

const Header = ({ isAuthenticated, deauthenticateUser, userSlug }) => {
  return (
    <nav className="mb-4 border-bottom pb-3">
      <div className="d-flex flex-row justify-content-center my-4 text-uppercase">
        <Link to="/" className="navbar-brand">
          FinancialBlog.com
        </Link>
      </div>
      <div className="mb-2 d-flex flex-row justify-content-center">
        <ul className="d-flex flex-column flex-md-row justify-content-around navbar-nav">
          {!isAuthenticated && (
            <>
              <li className="nav-item my-1 my-md-0 mx-2 mx-sm-3 mx-lg-5">
                <Link to="/login">Login</Link>
              </li>
              <li className="nav-item my-1 my-md-0 mx-2 mx-sm-3 mx-lg-5">
                <Link to="/sign-up">Sign up</Link>
              </li>
            </>
          )}
          <li className="nav-item my-1 my-md-0 mx-2 mx-sm-3 mx-lg-5">
            <Link to="/about">About us</Link>
          </li>
          {isAuthenticated && (
            <>
              <li className="nav-item my-1 my-md-0 mx-2 mx-sm-3 mx-lg-5">
                <Link to={`/profile/${userSlug}`}>
                  <span className="fa fa-user me-1"></span>
                  <span>Profile</span>
                </Link>
              </li>
              <li className="nav-item my-1 my-md-0 mx-2 mx-sm-3 mx-lg-5">
                <Link to="/posts/new">
                  <span className="fa fa-plus me-1"></span>
                  <span>New post</span>
                </Link>
              </li>
              <li className="nav-item my-1 my-md-0 mx-2 mx-sm-3 mx-lg-5">
                <a
                  onClick={() => {
                    deauthenticateUser();
                  }}
                  href="#"
                >
                  Log out
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export default ConnectedHeader;
