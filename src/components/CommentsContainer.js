import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import { useAlert } from 'react-alert';
import { removeComment } from '../actions/comments';

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  comments: state.comments.currentPostComments,
  authToken: state.auth.authToken
});

const mapDispatchToProps = (dispatch) => ({
  removeComment: (id) => dispatch(removeComment(id))
});

function CommentsContainer({
  comments,
  isAuthenticated,
  authToken,
  removeComment
}) {
  const slug = localStorage.getItem('userSlug');
  const alert = useAlert();

  const deleteComment = (id) => {
    let endpoint = `${process.env.REACT_APP_API_URL}/comments/delete/${id}`;
    const data = {
      token: authToken
    };
    fetch(endpoint, {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json' }
    })
      .then((response) => {
        if (response.status === 200) return true;
        return false;
      })
      .then((success) => {
        if (success) {
          alert.success('comment deleted successfully');
          removeComment(id);
        } else {
          alert.error('comment cannot be deleted at this time');
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="row mt-4 px-1">
      {comments ? (
        comments.length > 0 &&
        comments.map((comment) => (
          <div key={comment.id} className="comment col-12">
            <div className="d-flex justify-content-between">
              <h6>
                By{' '}
                <Link
                  className="text-capitalize"
                  to={`/profile/${comment.userSlug}`}
                >
                  {comment.userName}
                </Link>
              </h6>
              {/* only visible if user is comment's owner */}
              {isAuthenticated && comment.userSlug === slug ? (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteComment(comment.id);
                  }}
                  title="delete comment"
                  className="text-danger"
                >
                  <span className="fa fa-trash me-3"></span>
                </a>
              ) : (
                ''
              )}
            </div>
            <div>{parse(comment.content)}</div>
          </div>
        ))
      ) : (
        <p>
          <Spinner />
        </p>
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
