"use client";

import { useEffect, useState } from "react";

const Now = () => {
  // Local date and time state
  const [currentTime, setCurrentTime] = useState({
    time: "",
    day: "",
    date: "",
  });

  useEffect(() => {
    // Function to update date and time
    const updateTime = () => {
      const now = new Date();

      // Get local date, time, and day of the week
      const time = now.toLocaleTimeString();
      const date = now.toLocaleDateString();
      const day = now.toLocaleDateString(undefined, { weekday: "long" });

      setCurrentTime({
        time,
        day,
        date,
      });
    };

    // Initial call to set the time
    updateTime();

    // Set interval to update every second
    const intervalId = setInterval(updateTime, 1000);

    // Cleanup the interval on component unmount
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
