import { useEffect, useState } from "react";
import services from "../api/services";

interface LaunchData {
  name: string;
  date_utc: string;
}

const LaunchTimer = () => {
  const [launch, setLaunch] = useState<LaunchData | null>(null);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const fetchLaunchData = async () => {
      const data = await services.fetchNextLaunch();
      if (data) {
        setLaunch(data);
        updateTimer(data.date_utc);
      }
    };

    fetchLaunchData();
  }, []);

  useEffect(() => {
    if (!launch?.date_utc) return;
    const interval = setInterval(() => updateTimer(launch.date_utc), 1000);
    return () => clearInterval(interval);
  }, [launch]);

  const updateTimer = (dateStr: string) => {
    const target = new Date(dateStr).getTime();
    const now = new Date().getTime();
    const distance = Math.abs(target - now);

    if (distance <= 0) return;

    setTimeLeft({
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / (1000 * 60)) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    });
  };

  if (!launch) {
    return;
  }

  return (
    <div className="mt-10 text-center">
      <h3 className="text-2xl font-semibold mb-4">{launch.name} Launches In:</h3>
      <div className="flex justify-center gap-4 text-white text-lg md:text-2xl font-bold">
        {["days", "hours", "minutes", "seconds"].map((unit) => (
          <div
            key={unit}
            className="flex flex-col items-center bg-white/10 rounded-xl shadow-inner backdrop-blur-md p-4 min-w-[70px] neumorphic-slide"
          >
            <span className="text-3xl md:text-4xl">{timeLeft[unit as keyof typeof timeLeft]}</span>
            <span className="text-sm uppercase text-gray-300 tracking-wide">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaunchTimer;
