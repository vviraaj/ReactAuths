"use client";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import logo from "@/Svgs/logo.svg";
import login from "@/Svgs/login.png";
import userDatas from "@/app/Component/data.json";
import { useRouter } from "next/navigation";

export default function Example() {
  // State variables for email, password, user data, and validation status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState([]);
  const [valid, setValid] = useState({
    email: false,
    password: false,
  });
  const router = useRouter();

  // Fetch user data on component mount
  useEffect(() => {
    setUserData(userDatas);
  }, []);

  // Function to validate form fields
  const validateFields = () => {
    let isValid = true;

    // Validate email
    if (!email.trim()) {
      setValid((prevValid) => ({ ...prevValid, email: true }));
      isValid = false;
    } else {
      setValid((prevValid) => ({ ...prevValid, email: false }));
    }

    // Validate password
    if (!password.trim() || password.length < 6) {
      setValid((prevValid) => ({ ...prevValid, password: true }));
      isValid = false;
    } else {
      setValid((prevValid) => ({ ...prevValid, password: false }));
    }

    return isValid;
  };

  // Function to handle sign-in
  const handlesignin = () => {
    if (validateFields()) {
      // Find user based on email and password
      const user = userData.find(
        (user) => user.username === email && user.password === password
      );

      if (user) {
        // Store user data in session storage on successful login
        let userdata = JSON.stringify(user);
        sessionStorage.setItem("userdata", userdata);
        toast.success("User successfully logged in");

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.replace("/");
        }, 3000);
      } else {
        // Display error messages for incorrect email or password
        const emailExists = userData.find((user) => user.username === email);
        const passwordExists = userData.find(
          (user) => user.password === password
        );

        if (!emailExists) {
          setValid((prevValid) => ({ ...prevValid, email: true }));
          toast.error("Email is incorrect");
        }

        if (!passwordExists) {
          setValid((prevValid) => ({ ...prevValid, password: true }));
          toast.error("Password is incorrect");
        }
      }
    } else {
      // Display error message for required fields
      toast.error("All fields are required!");

      // Reset validation status after 3.5 seconds
      setTimeout(() => {
        setValid({
          email: false,
          password: false,
        });
      }, 3500);
    }
  };

  return (
    <>
      {/* Main container for login page */}
      <div className="min-h-screen flex  flex-1">
        {/* Left side of the login page with login form */}
        <div
          className="login_Background flex flex-1 flex-col lg:w-[50%] justify-center px-4 py-12 sm:px-6 
        lg:flex-none lg:px-20 xl:px-24"
        >
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              {/* Company logo and login heading */}
              <Image className="h-10 w-auto" src={logo} alt="Company Logo" />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-white">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10">
              {/* Login form */}
              <div className="flex flex-col space-y-6">
                <div>
                  {/* Email input */}
                  <label
                    htmlFor="UserName"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    UserName <span className="text-red-600">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="UserName"
                      name="UserName"
                      type="text"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value),
                          setValid((prevValid) => ({
                            ...prevValid,
                            email: false,
                          }));
                      }}
                      className={`block pl-3 w-full rounded-md border-0 py-1.5 shadow-sm 
                        ring-1 ring-inset ring-black placeholder:text-gray-400 
                        focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${
                          valid.email ? "border-red-500 border-2 " : ""
                        }`}
                    />
                  </div>
                </div>

                <div>
                  {/* Password input */}
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Password <span className="text-red-600">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value),
                          setValid((prevValid) => ({
                            ...prevValid,
                            password: false,
                          }));
                      }}
                      type="password"
                      className={`block pl-3 w-full rounded-md border-0 py-1.5 shadow-sm 
                        ring-1 ring-inset ring-black placeholder:text-gray-400 
                        focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${
                          valid.password ? "border-red-500 border-2" : ""
                        }`}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {/* Remember me checkbox */}
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-sm leading-6 text-white"
                    >
                      Remember me
                    </label>
                  </div>
                </div>

                <div>
                  {/* Sign-in button */}
                  <button
                    onClick={handlesignin}
                    className="flex btn_Signin_Background w-full justify-center rounded-md 
                       px-3 py-1.5 text-sm font-semibold
                       leading-6 text-white shadow-sm hover:bg-indigo-500 
                       focus-visible:outline focus-visible:outline-2 
                       focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side of the login page with background image */}
        <div className="relative hidden w-0 flex-1 lg:block">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src={login}
            alt="login"
          />
        </div>
      </div>

      {/* Toast notification container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        className="reversed-progress-bar"
      />
    </>
  );
}
