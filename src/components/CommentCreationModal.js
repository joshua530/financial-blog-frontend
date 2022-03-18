import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { addComment } from '../actions/comments';

const mapStateToProps = (state) => {
  const authData = {
    token: state.auth.authToken,
    userSlug: state.auth.userSlug
  };
  return { authData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (comment) => dispatch(addComment(comment))
  };
};

function CommentCreationModal({ slug, authData, addComment }) {
  const [content, setContent] = useState('');
  const [commentCreated, setCommentCreated] = useState(false);

  const alert = useAlert();
  const navigate = useNavigate();

  const endpoint = `${process.env.REACT_APP_API_URL}/comments/create`;
  const modalToggler = document.querySelector('#commentModalToggler');

  useEffect(() => {
    if (commentCreated) {
      modalToggler.click();
      setContent('');
      navigate(`/posts/view/${slug}`);
    }
  }, [commentCreated]);

  const postComment = (e) => {
    e.preventDefault();
    const data = {
      content,
      token: authData.token,
      userSlug: authData.userSlug,
      postSlug: slug
    };
    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert.error('comment creation failed. refresh page and try again');
        } else {
          addComment(data);
          setCommentCreated(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div
      className="modal fade"
      id="commentModal"
      tabIndex="-1"
      aria-labelledby="commentModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="commentModalLabel">
              Enter the comment below
            </h5>
            <button
              id="commentModalToggler"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={postComment}>
              <div className="form-group">
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  onChange={(e, editor) => {
                    const data = editor.getData();
                    setContent(data);
                  }}
                />
              </div>
              <button
                type="submit"
                className="border-0 btn btn-primary btn-submit mt-4"
              >
                Post comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentCreationModal);
