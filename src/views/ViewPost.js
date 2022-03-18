import CommentsContainer from '../components/CommentsContainer';
import Post from '../components/Post';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { indexPost } from '../actions/posts';
import { setComments } from '../actions/comments';

const mapDispatchToProps = (dispatch) => {
  return {
    indexPost: (post) => dispatch(indexPost(post)),
    setPostComments: (comments) => dispatch(setComments(comments))
  };
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const ViewPost = ({ indexPost, setPostComments }) => {
  const [postData, setPostData] = useState({});
  const { slug } = useParams();
  const [postExists, setPostExists] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    if (postExists !== false) {
      fetchPostData();
    } else {
      nav('/404');
    }
  }, [postExists]);

  const fetchPostData = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/posts/${slug}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const msg404 = 'post with given slug does not exist';
        if (data['error'] && data['error'] === msg404) {
          setPostExists(false);
        } else {
          setPostData(data);
          setPostComments(data.comments);
          indexPost(data.post);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="d-flex justify-content-center row">
        <div className="col-md-8 col-lg-6 mt-5 mb-2">
          <Post post={postData.post} />
          <br />
          <CommentsContainer />
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);
