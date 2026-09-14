import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Navbar } from "./components/navigation/navbar";
import { Signup } from "./components/authentication/signup";
import { Login } from "./components/authentication/login";
import { Profile } from "./components/userProfile/profile/profile";
import {
  authStatus,
  loginFromServer,
  logoutFromServer,
  signupFromServer,
} from "./services/authLinkServices";
import { useEffect, useRef, useState } from "react";
import { Loader } from "./components/loader";
import { userDataFromServer } from "./services/userLinkServices";
import { CompleteProfile } from "./components/userProfile/profile/completeProfile";
import { Dashboard } from "./components/dashboard/dashboard";
import { CreatePost } from "./components/userProfile/PostCreate/temp";
import { Post } from "./components/userProfile/showPost/Post";
import { MyNetwork } from "./components/userProfile/userNetwork/MyNetwork";
import {
  getAllPostsFromServer,
  getPostFromServer,
} from "./services/userPostLinkServices";
import { UserSearchProfile } from "./components/navigation/showUsersProfile";
import { Defaultpage } from "./components/defaultpage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [loginErr, setLoginErr] = useState("");
  const [posts, setPost] = useState([]);
  const popupRef = useRef();
  const [AllPosts, setAllPosts] = useState([]);
  const [searchResultData, setSearchResultData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getAllPostsFromServer().then((result) => {
      setAllPosts(result.usersPost);
    });
  }, []);

  useEffect(() => {
    getPostFromServer().then((result) => {
      setPost(result?.post);
    });
  }, []);

  useEffect(() => {
    authStatus()
      .then((res) => {
        setIsLogin(res.isLoggedIn);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLoginData = async (data) => {
    const result = await loginFromServer(data);
    setIsLogin(result.isLoggedIn);
    setLoginErr(result);
    if (result.isLoggedIn) {
      navigate("/profile");
    }
  };

  const handleSignupData = async (data) => {
    const result = await signupFromServer(data);
    if (result) {
      navigate("/login");
    }
  };

  const handleLogout = async (isLogout) => {
    const result = await logoutFromServer();
    if (result) {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    if (isLogin) {
      userDataFromServer().then((data) => {
        setUserData(data);
      });
    }
  }, [isLogin]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar
            isLogin={isLogin}
            handleLogout={handleLogout}
            userData={userData}
            popupRef={popupRef}
            setSearchResultData={setSearchResultData}
          />

          <Routes>
            {isLogin ? (
              <>
                <Route
                  path="/"
                  element={
                    <Dashboard userData={userData} AllPosts={AllPosts} />
                  }
                />
                <Route
                  path="/profile"
                  element={<Profile userData={userData} />}
                />

                <Route
                  path={`/profile/isCompleted=${userData.isProfileComplete}`}
                  element={<CompleteProfile />}
                />

                <Route path="/profile/myNetwork" element={<MyNetwork />} />

                <Route
                  path="/profile/create-post"
                  element={<CreatePost setPost={setPost} />}
                />
                <Route
                  path="/profile/post"
                  element={
                    <Post userData={userData} posts={posts} setPost={setPost} />
                  }
                />

                <Route
                  path="/profile/search=true/:userId"
                  element={
                    <UserSearchProfile
                      searchResultData={searchResultData}
                      setSearchResultData={setSearchResultData}
                      setUserData={setUserData}
                    />
                  }
                />
              </>
            ) : (
              <>
                <Route path="/" element={<h1> Dashboard </h1>} />
                <Route
                  path="/login"
                  element={
                    <Login
                      handleLoginData={handleLoginData}
                      loginErr={loginErr}
                    />
                  }
                />
                <Route
                  path="/signup"
                  element={<Signup handleSignupData={handleSignupData} />}
                />
              </>
            )}
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
