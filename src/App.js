import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './views/Home';
import About from './views/About';
import Footer from './components/Footer';
import CreatePost from './views/CreatePost';
import EditPost from './views/EditPost';
import ViewPost from './views/ViewPost';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Profile from './views/Profile';
import UpdateProfile from './views/UpdateProfile';
import UpdatePassword from './views/UpdatePassword';
import UserPosts from './views/UserPosts';
import PageNotFound from './views/PageNotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Forbidden403 from './views/Forbidden403';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="posts">
              <Route index element={<PageNotFound />} />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update/:slug"
                element={
                  <ProtectedRoute>
                    <EditPost />
                  </ProtectedRoute>
                }
              />
              <Route path="view/:slug" element={<ViewPost />} />
              <Route path="users/:slug" element={<UserPosts />} />
            </Route>
            <Route path="profile">
              <Route index element={<PageNotFound />} />
              <Route path=":slug" element={<Profile />} />
              <Route
                path=":slug/update"
                element={
                  <ProtectedRoute>
                    <UpdateProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":slug/update-password"
                element={
                  <ProtectedRoute>
                    <UpdatePassword />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="sign-up" element={<SignUp />} />
          </Route>

          {/* error views */}
          <Route path="/403" element={<Forbidden403 />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
