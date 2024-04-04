import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "@/pages/Login/Login";
import LobbyPage from "@/pages/Lobby/LobbyPage";
import WatingPage from "@/pages/Waiting/WaitingPage";
import { QueryClient, QueryClientProvider } from "react-query";

interface State {
  mySessionId: string;
  myUserName: string;
  session: any;
  mainStreamManager: any;
  publisher: any;
  subscribers: any[];
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
    };
  }

  render() {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/lobby" element={<LobbyPage />} />
            <Route path="/waiting/:roomId" element={<WatingPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    );
  }
}

export default App;
