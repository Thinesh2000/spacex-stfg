// src/pages/History.tsx
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface HistoryEvent {
  id: number;
  title: string;
  event_date_utc: string;
  details: string;
  links: {
    article?: string;
    wikipedia?: string;
  };
}

export default function History() {
  const [history, setHistory] = useState<HistoryEvent[]>([]);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/history")
      .then((res) => res.json())
      .then(setHistory)
      .catch(console.error);
  }, []);

  return (
    <main className="text-white ">
      {/* Intro Section */}
      <section className="flex flex-col gap-6 justify-center px-6 py-16 min-h-screen max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-md">
          Echoes of Exploration
        </h2>
        <p className="text-lg md:text-xl max-w-3xl text-gray-200 drop-shadow-sm">
          Journey through SpaceX's defining moments — from humble beginnings to pioneering
          interplanetary travel.
        </p>
      </section>

      {/* Timeline */}
      <section className="relative max-w-5xl mx-auto px-6 pb-20">
        <h3 className="text-3xl font-bold mb-12 text-center border-b border-white/10 pb-4">
          SpaceX History Timeline
        </h3>

        <div className="relative border-l border-white/20 pl-6">
          {history.slice(0, 25).map((event) => (
            <div key={event.id} className="mb-12 relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[10px] top-1.5 w-4 h-4 bg-blue-500 rounded-full border-2 border-white group-hover:scale-110 transition" />

              {/* Date + Content */}
              <div className="ml-4 pl-4">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-5 transition hover:scale-[1.01] hover:shadow-xl">
                  <time className="block text-sm text-gray-400 mb-1">
                    {format(new Date(event.event_date_utc), "MMMM dd, yyyy")}
                  </time>
                  <h4 className="text-xl font-semibold mb-2">{event.title}</h4>
                  <p className="text-gray-300 text-sm mb-3">{event.details}</p>
                  <div className="flex gap-4 text-sm">
                    {event.links.article && (
                      <a
                        href={event.links.article}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        Read Article
                      </a>
                    )}
                    {event.links.wikipedia && (
                      <a
                        href={event.links.wikipedia}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        Wikipedia
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
