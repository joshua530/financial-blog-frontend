import React from 'react';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Spinner from './Spinner';

const mapStateToProps = (state) => {
  return { authToken: state.auth.authToken };
};

function PostDeletionModal({ slug, authToken }) {
  const navigate = useNavigate();
  const alert = useAlert();

  const [deletionSuccessful, setDeletionSuccessful] = useState(false);
  const [deletingPost, setDeletingPost] = useState(false);

  useEffect(() => {
    if (deletionSuccessful) {
      console.log('deleted successfully');
      const modalToggler = document.querySelector('#toggleDeletionModal');
      modalToggler.click();
      alert.success('post deleted successfully');
      navigate('/');
    }
  }, [deletionSuccessful]);

  const deletePost = () => {
    setDeletingPost(true);
    const endpoint = `${process.env.REACT_APP_API_URL}/posts/${slug}/delete`;
    const httpOptions = {
      method: 'DELETE',
      body: JSON.stringify({ token: authToken }),
      headers: {
        'Content-type': 'application/json'
      }
    };
    fetch(endpoint, httpOptions)
      .then((response) => response.json())
      .then((data) => {
        setDeletingPost(false);
        if (data.success) {
          setDeletionSuccessful(true);
        } else {
          alert.error('post deletion failed, refresh page and try again');
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div
      className="modal fade"
      id="deletePostModal"
      tabIndex="-1"
      aria-labelledby="deletePostLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deletePostLabel">
              Delete the post?
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {deletingPost ? (
              <Spinner />
            ) : (
              <a
                onClick={deletePost}
                className="text-danger text-decoration-none"
                href="#"
              >
                <span className="fa fa-check me-1"></span>
                <span>Yes, delete</span>
              </a>
            )}
            <a
              id="toggleDeletionModal"
              className="ms-3 text-success text-decoration-none"
              href="#"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span className="fa fa-times me-1"></span>
              <span>No, take me back</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(PostDeletionModal);
