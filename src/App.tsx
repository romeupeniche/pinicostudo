import { useEffect, useState } from "react";
import TodayClasses from "./components/TodayClasses"
import Activities from "./components/Activities";
import { dateFormatter } from "./utils/dateFormatter";
import Notes from "./components/Notes";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const today = dateFormatter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;

  const getGreeting = () => {
    const hour = currentTime.getHours();

    if (hour >= 5 && hour < 12) {
      return 'Bom dia';
    } else if (hour >= 12 && hour < 18) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  };

  return (
    <section>
      <header className="flex items-center justify-between p-4 m-4 rounded-full text-xl bg-black/30 border-white/10 border">
        <span>PinicoStudo</span>
        <span>{formattedTime}</span>
      </header>
      <span className="flex items-center justify-between px-4 text-lg">
        <h2>{getGreeting()}, Romeu.</h2>
        <h2>{today}</h2>
      </span>
      <main className="flex flex-col space-y-4 sm:px-4 px-2">
        <TodayClasses currentTime={currentTime} />
        <Activities />
        <Notes />
      </main>
    </section>
  )
}

export default App
