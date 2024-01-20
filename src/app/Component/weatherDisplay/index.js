import React from "react";
import Image from "next/image";

const WeatherDisplay = ({ weatherData }) => {
  // Extract weather icon and temperature from the data
  let weathericons = weatherData.weather && weatherData.weather[0].icon;
  let temperature = Math.round(
    weatherData.main && weatherData.main.temp - 273.15
  );

  // Generate the URL for the weather icon
  const iconUrl = `https://openweathermap.org/img/wn/${weathericons}.png`;

  // Determine background color based on temperature
  const backgroundColor = getBackgroundColor(temperature);

  return (
    // Main container with flex layout and dynamic background color
    <div
      className={`flex lg:flex-row flex-col font-sans rounded-md p-4 ${backgroundColor}`}
    >
      {/* Container for weather icon */}
      <div className="flex-none lg:w-48 w-full relative rounded-md bg-indigo-600">
        {weathericons ? (
          <Image src={iconUrl} alt="icons" width={400} height={400} />
        ) : (
          ""
        )}
      </div>

      {/* Container for weather details */}
      <div className="flex-auto p-6 space-y-6">
        <div className="flex flex-wrap">
          {/* Heading */}
          <h1 className="flex-auto text-lg font-semibold text-slate-900">
            Current Weather Report
          </h1>

          {/* City name container with background color */}
          <div className="w-full flex-none text-sm font-medium text-white text-center w-auto mt-2 bg-indigo-600 rounded-md">
            {weatherData.name}
          </div>
        </div>

        {/* Weather tempaerature and other details */}
        <div
          className={`w-full flex-none text-sm font-medium text-slate-600 border-2 border-red-600 text-center w-auto mt-2 
             rounded-md ${backgroundColor}`}
        >
          Temperature: {temperature ?  `${temperature}°C` : ""}
        </div>

        <div
          className={`w-full flex-none text-sm font-medium text-slate-600 border-2 border-red-600 text-center w-auto mt-2 
             rounded-md ${backgroundColor}`}
        >
          Weather: {weatherData.weather && weatherData.weather[0].description}
        </div>

        <div
          className={`w-full flex-none text-sm font-medium text-slate-600 border-2 border-red-600 text-center w-auto mt-2 
             rounded-md ${backgroundColor}`}
        >
          Winds: {weatherData.wind && weatherData.wind.speed} m/s,{" "}
          {weatherData.wind && weatherData.wind.deg}°
        </div>
      </div>
    </div>
  );
};

// Function to determine background color based on temperature
const getBackgroundColor = (temperature) => {
  switch (true) {
    case temperature < 10:
      return "bg-white"; // White for temperatures below 10°C
    case temperature < 20:
      return "bg-[#d4d4d4]"; // Light gray for temperatures between 10°C and 20°C
    case temperature <= 30:
      return "bg-[#fed7aa]"; // Light orange for temperatures between 20°C and 30°C
    case temperature <= 40:
      return "bg-[#fbbf24]"; // Orange for temperatures between 30°C and 40°C
    default:
      return "bg-[#fff]"; // Dark orange for temperatures above 40°C
  }
};

export default WeatherDisplay;
