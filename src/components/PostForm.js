import { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const PostForm = ({ isNewPost, post }) => {
  const alert = useAlert();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postComplete, setCompleted] = useState(false);
  const [slug, setSlug] = useState('');
  const [endpoint, setEndpoint] = useState(
    `${process.env.REACT_APP_API_URL}/posts/new`
  );
  const [requestMethod, setRequestMethod] = useState('POST');

  useEffect(() => {
    if (postComplete && slug) {
      navigate(`/posts/view/${slug}`);
    }
    if (!isNewPost && post) {
      setTitle(post.title);
      setContent(post.content);
      setSlug(post.slug);
      setRequestMethod('PUT');
      setEndpoint(`${process.env.REACT_APP_API_URL}/posts/${post.slug}/update`);
    }
  }, [postComplete, post]);

  const createPost = (e) => {
    e.preventDefault();

    if (!title) {
      alert.error('title cannot be empty');
      return;
    }
    if (!content) {
      alert.error('content cannot be empty');
      return;
    }

    const token = localStorage.getItem('authToken');
    const data = { title, content, token };
    fetch(endpoint, {
      method: requestMethod,
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
        } else {
          const slug = data.slug;
          setSlug(slug);
          setCompleted(true);
        }
      });
  };

  return (
    <div className="d-flex justify-content-center row">
      <form onSubmit={createPost} className="mx-2 col-md-8 col-lg-6 mt-5 mb-5">
        <div className="form-section">
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="form-control"
            id="title"
          />
        </div>
        <div className="form-section">
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(e, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
            onReady={(editor) => {
              editor.setData(content);
            }}
          />
        </div>
        <button
          type="submit"
          className="border-0 btn btn-primary btn-submit mt-4"
        >
          {isNewPost ? 'Create post' : 'Update post'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
