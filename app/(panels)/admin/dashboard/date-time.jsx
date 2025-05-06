"use client";

import { useEffect, useState } from "react";

const Now = () => {
  const [currentTime, setCurrentTime] = useState({
    time: "",
    day: "",
    date: "",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Format time
      const time = now.toLocaleTimeString();

      // Format date as 1-Nov-2024
      const day = now.toLocaleDateString(undefined, { weekday: "long" });
      const date = `${now.getDate()}-${now.toLocaleString("default", {
        month: "short",
      })}-${now.getFullYear()}`;

      setCurrentTime({
        time,
        day,
        date,
      });
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="time text-right text-sm">
      <div>
        {currentTime.day}, {currentTime.date}
      </div>
      <div>{currentTime.time}</div>
    </div>
  );
};

export default Now;
