"use client";
import React, { useEffect, useState } from "react";
import Sharedlayout from "@/app/Component/SharedLayout";
import { useDarkMode } from "@/app/Component/Context/darkmode";
import Image from "next/image";
import user from "@/Svgs/user.png";

const User = () => {
  const [userData, setUserData] = useState(null);
  const { darkMode, toggleDarkMode } = useDarkMode(); // Using context for dark mode

  // Get user data from session storage
  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userdata");

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  return (
    <div
      className={`${!darkMode ? "login_Background" : "darkmode"} min-h-screen`}
    >
      <Sharedlayout />
      <div class=" py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col justify-center items-center space-y-6 ">
          <div class="">
            <h2 class="text-3xl font-bold tracking-tight  text-center  sm:text-4xl">
              User Details
            </h2>
            <p class="mt-6 text-lg leading-8 ">
              Here You can find yours details
            </p>
          </div>

          <div className="rounded-xl p-10 bg-teal-600 rounded-2xl bg-gray-800 px-8 py-10 shadow-md ring-blue-500">
            <Image height={200} width={200} src={user} alt="userImage" />
            <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight">
              {userData && userData.name}
            </h3>
            <p className="text-base leading-7">
              City: {userData && userData.city}
            </p>
            <p className="text-base leading-7">
              UserName: {userData && userData.username}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
