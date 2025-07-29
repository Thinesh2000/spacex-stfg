import {} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// assets
import BgVideo from "./assets/bg_video1.mp4";

// styles
import "./App.css";

// components
import RootRouter from "./router/RootRouter";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={BgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content on top of video, optional */}
      <QueryClientProvider client={queryClient}>
        <div className="relative z-10 h-full w-full overflow-y-auto scrollbar backdrop-blur-md">
          <RootRouter />
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default App;
