"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherDisplay from "@/app/Component/weatherDisplay";
import { useDarkMode } from "@/app/Component/Context/darkmode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SharedLayout from "@/app/Component/SharedLayout";

export default function Example() {
  // State variables for mobile menu and weather data
  const [weatherdata, setWeatherdata] = useState({});
  const [userdatas, setUserdatas] = useState(null);
  const { darkMode, toggleDarkMode } = useDarkMode(); // Using context for dark mode

  // to get the data of the user from sessionstorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserData = sessionStorage.getItem("userdata");
      if (storedUserData) {
        setUserdatas(JSON.parse(storedUserData));
      }
    }
  }, []);

  // Fetch weather data on component mount
  useEffect(() => {
    // Check if user data is present before fetching weather data
    if (userdatas) {
      getWeatherData(userdatas.city);
    }
  }, [userdatas]); // Trigger useEffect when user data changes

  // fetching the  data from the weather Api of user
  const getWeatherData = async (city) => {
    try {
      // Your api key here
      const apiKey = "1439e9459cffcfac0d315b1c9894c433";

      // your api url is here
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

      // call the pai and get the response
      const response = await axios.get(apiUrl);

      const weatherData = response.data;

      // setting the weather report in the weather data
      setWeatherdata(weatherData);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className={`${!darkMode ? "login_Background" : "darkmode"} min-h-screen`}
    >
      <SharedLayout />
      <main>
        <div className="relative isolate">
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-4xl font-bold tracking-tight  sm:text-6xl">
                    Get the Weather Report in Your area.
                  </h1>
                  <p className="mt-6 text-lg leading-8  sm:max-w-md lg:max-w-none">
                    As a weather forecaster, We are responsible for helping our
                    audience to plan their day, from deciding what to wear to
                    choosing which outdoor plans to keep or to break. On snowy
                    days, you even have the power to shape whether schools stay
                    open or close for the day.
                  </p>
                </div>
                {/* Pass weather data to WeatherDisplay component */}
                <WeatherDisplay weatherData={weatherdata} />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Toast notification container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        className="reversed-progress-bar"
      />
    </div>
  );
}
