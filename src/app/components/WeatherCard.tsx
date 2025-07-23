"use client";

import React from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiWindy,
} from "react-icons/wi";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  description?: string;
}

interface WeatherCardProps {
  weather: WeatherData;
}

const getWeatherIcon = (condition: string) => {
  const lowerCondition = condition.toLowerCase();

  if (lowerCondition.includes("sunny") || lowerCondition.includes("clear")) {
    return <WiDaySunny className="text-yellow-400" size={48} />;
  } else if (
    lowerCondition.includes("cloudy") ||
    lowerCondition.includes("overcast")
  ) {
    return <WiCloudy className="text-gray-400" size={48} />;
  } else if (
    lowerCondition.includes("rain") ||
    lowerCondition.includes("drizzle")
  ) {
    return <WiRain className="text-blue-400" size={48} />;
  } else if (
    lowerCondition.includes("snow") ||
    lowerCondition.includes("blizzard")
  ) {
    return <WiSnow className="text-white" size={48} />;
  } else if (
    lowerCondition.includes("thunder") ||
    lowerCondition.includes("storm")
  ) {
    return <WiThunderstorm className="text-purple-400" size={48} />;
  } else if (lowerCondition.includes("wind")) {
    return <WiWindy className="text-gray-300" size={48} />;
  }

  return <WiDaySunny className="text-yellow-400" size={48} />;
};

const getBackgroundGradient = (condition: string) => {
  const lowerCondition = condition.toLowerCase();

  if (lowerCondition.includes("sunny") || lowerCondition.includes("clear")) {
    return "from-yellow-400 to-orange-500";
  } else if (
    lowerCondition.includes("cloudy") ||
    lowerCondition.includes("overcast")
  ) {
    return "from-gray-400 to-gray-600";
  } else if (
    lowerCondition.includes("rain") ||
    lowerCondition.includes("drizzle")
  ) {
    return "from-blue-400 to-blue-600";
  } else if (
    lowerCondition.includes("snow") ||
    lowerCondition.includes("blizzard")
  ) {
    return "from-blue-200 to-blue-400";
  } else if (
    lowerCondition.includes("thunder") ||
    lowerCondition.includes("storm")
  ) {
    return "from-purple-500 to-gray-700";
  }

  return "from-blue-400 to-blue-600";
};

export default function WeatherCard({ weather }: WeatherCardProps) {
  const backgroundGradient = getBackgroundGradient(weather.condition);

  return (
    <div
      className={`bg-gradient-to-br ${backgroundGradient} rounded-xl p-6 text-white shadow-lg max-w-lg mx-auto my-4`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{weather.location}</h3>
          <p className="text-3xl font-bold">{weather.temperature}°C</p>
        </div>
        <div className="flex flex-col items-center">
          {getWeatherIcon(weather.condition)}
          <p className="text-sm mt-1 capitalize">{weather.condition}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center">
          <span className="opacity-80">Humidity:</span>
          <span className="ml-2 font-medium">{weather.humidity}%</span>
        </div>
        <div className="flex items-center">
          <span className="opacity-80">Wind:</span>
          <span className="ml-2 font-medium">{weather.windSpeed} km/h</span>
        </div>
      </div>

      {weather.description && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-sm opacity-90">{weather.description}</p>
        </div>
      )}
    </div>
  );
}
