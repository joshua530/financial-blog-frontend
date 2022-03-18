import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import PostDeletionModal from './PostDeletionModal';
import CommentCreationModal from './CommentCreationModal';

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

function Post({ post, isAuthenticated }) {
  const [ownsPost, setOwnsPost] = useState(null);

  useEffect(() => {
    // don't check post ownership before post loads
    if (post) setOwnsPost(isPostOwner());
  }, [post, isAuthenticated]);

  const isPostOwner = () => {
    const userSlug = localStorage.getItem('userSlug');
    if (!userSlug) return false;
    return post.userSlug === userSlug;
  };

  return (
    <>
      {post ? (
        <>
          <div className="d-flex flex-column flex-sm-row justify-content-between">
            <h5 className="me-2">
              <span className="text-capitalize text-decoration-underline">
                {post.title}
              </span>{' '}
              by{' '}
              <Link
                className="text-capitalize"
                to={`/profile/${post.userSlug}`}
              >
                {post.userName}
              </Link>
            </h5>
            {ownsPost ? (
              <p className="ms-0 ms-sm-3 mt-2 mt-sm-0">
                <a
                  className="text-danger text-decoration-none me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#deletePostModal"
                  href="#"
                  title="delete post"
                >
                  <small className="d-inline-block me-1 me-sm-3">
                    <i className="fa fa-trash me-1"></i>Delete
                  </small>
                </a>
                <Link to={`/posts/update/${post.slug}`} className="me-1">
                  <small className="d-inline-block">
                    <i className="fa fa-pencil me-1"></i>edit
                  </small>
                </Link>
              </p>
            ) : (
              ''
            )}
          </div>
          <div className="mb-4">{parse(post.content)}</div>
          {isAuthenticated && (
            <button
              data-bs-toggle="modal"
              data-bs-target="#commentModal"
              className="btn btn-sm btn-brown"
            >
              Comment on post
            </button>
          )}
          <PostDeletionModal slug={post.slug} />
          <CommentCreationModal slug={post.slug} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default connect(mapStateToProps)(Post);
