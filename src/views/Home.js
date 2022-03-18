import img from './img.jpeg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import { useAlert } from 'react-alert';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { indexPost } from '../actions/posts';

const mapDispatchToProps = (dispatch) => {
  return { indexPost: (post) => dispatch(indexPost(post)) };
};

const Home = ({ indexPost }) => {
  const [homePageData, setHomePageData] = useState({});

  useEffect(() => {
    const getData = async () => {
      await fetchHomePageData();
    };
    getData();
  }, []);

  const fetchHomePageData = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/home`)
      .then((response) => response.json())
      .then((data) => {
        setHomePageData(data);
        data.latestPosts.forEach((p) => indexPost(p));
      })
      .catch((e) => console.log(e));
  };
  const alert = useAlert();
  return (
    <>
      <div className="row">
        <img className="img-fluid col-md-8 mt-2 rounded" src={img} alt="" />
        <p className="col-md-4 mt-2 fs-5">
          {homePageData.introText ? parse(homePageData.introText) : <Spinner />}
        </p>
      </div>
      <div className="mt-2 post-banner">
        <h1>Latest posts</h1>
        {homePageData.latestPosts ? (
          homePageData.latestPosts.length == 0 ? (
            <p>There are currently no posts to display</p>
          ) : (
            homePageData.latestPosts.map((post) => {
              return (
                <div key={post.slug} className="card my-2 post">
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/posts/view/${post.slug}`}>{post.title}</Link>
                    </h5>
                    <div className="card-text">{parse(post.content)}</div>
                  </div>
                </div>
              );
            })
          )
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

const DecoratedHome = connect(null, mapDispatchToProps)(Home);

export default DecoratedHome;
