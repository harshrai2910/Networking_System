import { motion } from "motion/react";
import signupImg from "../../images/signup.png";
import {
  signupFromServer,
  usernameStatus,
} from "../../services/authLinkServices";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";

export const Signup = () => {
  const [typer, setTyper] = useState("");
  const timer = useRef(null);
  const [fetchingStatus, setFetchingStatus] = useState(false);
  const [UserStatus, setUserStatus] = useState(false);
  const emailRef = useRef(null);
  const emailRefErr = useRef(null);
  const userNameRef = useRef(null);
  const userNameRefstatus = useRef(null);
  const passRef = useRef(null);
  const passRefErr = useRef(null);
  const confirmPassRef = useRef(null);
  const confirmPassRefErr = useRef(null);
  const [showPassword, setshowPassword] = useState(false);

  const navigate = useNavigate();

  const handleUsername = (event) => {
    setTyper(event.target.value);
  };

  useEffect(() => {
    if (typer) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      if (typer !== "") {
        if (/\s/.test(typer)) {
          userNameRefstatus.current.innerHTML = "Spaces are not allowed.";
          userNameRefstatus.current.style.color = "red";
          userNameRefstatus.current.style.display = "block";
        } else {
          setFetchingStatus(true);
          usernameStatus({ username: typer })
            .then((data) => {
              setUserStatus(data.status);
              if (data.status) {
                userNameRefstatus.current.innerHTML = "Username not available";
                userNameRefstatus.current.style.color = "red";
                userNameRefstatus.current.style.display = "block";
              } else {
                userNameRefstatus.current.innerText = "Username available";
                userNameRefstatus.current.style.color = "green";
                userNameRefstatus.current.style.display = "block";
              }
            })
            .catch(() => {
              userNameRefstatus.current.innerHTML =
                "Something went wrong. Please try again later.";
              userNameRefstatus.current.style.color = "red";
              userNameRefstatus.current.style.display = "block";
            })
            .finally(() => {
              setFetchingStatus(false);
            });
          if (fetchingStatus) {
            userNameRefstatus.current.innerHTML = "Checking username...";
            userNameRefstatus.current.style.display = "block";
          }
        }
      } else {
        userNameRefstatus.current.innerHTML = "";
      }
    }, 500);

    return () => {
      clearTimeout(timer.current);
    };
  }, [typer, timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailRefErr.current.style.display = "block";
      return;
    }

    if (UserStatus) return;

    console.log(UserStatus);
    const password = passRef.current.value.trim();
    if (password.length < 8) {
      passRefErr.current.style.display = "block";
      return;
    }

    const confirmPass = confirmPassRef.current.value.trim();
    if (password !== confirmPass) {
      confirmPassRefErr.current.style.display = "block";
      return;
    }

    const signupData = {
      username: userNameRef.current.value.trim(),
      email,
      password,
      confirmPassword: confirmPass,
    };

    const res = await signupFromServer(signupData);
    if (res.signup) {
      navigate("/login");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch max-w-6xl mx-auto md:p-4 py-2 mt-15">
      <div className="w-full max-w-2xl bg-white md:p-8 p-5 md:rounded-2xl shadow-sm">
        <h2 className="md:text-3xl text-2xl font-bold text-center text-gray-800 mb-8">
          Create Your Account
        </h2>

        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600 ml-1">
              Username
            </label>
            <input
              type="text"
              ref={userNameRef}
              value={typer}
              onChange={handleUsername}
              placeholder="username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
            />
            <p
              ref={userNameRefstatus}
              className="h-4 text-xs text-gray-500 hidden"
            ></p>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600 ml-1">
              Email
            </label>
            <input
              type="email"
              ref={emailRef}
              placeholder="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
            />
            <p ref={emailRefErr} className="h-4 text-xs text-red-500 hidden">
              email is not valid
            </p>
          </div>
          <div className="space-y-1 relative">
            <label className="text-sm font-medium text-gray-600 ml-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              ref={passRef}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
            />
            <button
              type="button"
              className="absolute right-4 top-9 cursor-pointer text-gray-500 hover:text-gray-800"
              onClick={() => setshowPassword(!showPassword)}
            >
              {showPassword ? <RxEyeOpen /> : <GoEyeClosed />}
            </button>
            <p ref={passRefErr} className="h-4 text-xs text-red-500 hidden">
              password must contain 6 digits
            </p>
          </div>
          <div className="space-y-1 relative">
            <label className="text-sm font-medium text-gray-600 ml-1">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              ref={confirmPassRef}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
            />
            <button
              type="button"
              className="absolute right-4 top-9 cursor-pointer text-gray-500 hover:text-gray-800"
              onClick={() => setshowPassword(!showPassword)}
            >
              {showPassword ? <RxEyeOpen /> : <GoEyeClosed />}
            </button>
            <p
              ref={confirmPassRefErr}
              className="h-4 text-xs text-red-500 hidden"
            >
              password dosen't match
            </p>
          </div>
          <div className="pt-4 flex items-center justify-end">
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="bg-blue-600 w-full hover:bg-blue-700 cursor-pointer text-white font-semibold py-3 rounded-lg shadow-md transition-colors"
            >
              Signup
            </motion.button>
          </div>
        </form>
      </div>

      <div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full flex items-center justify-center bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
      >
        <img
          src={signupImg}
          alt="Quick Signup"
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  );
};
