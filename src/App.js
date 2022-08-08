import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import SuperHeroesPage from "./components/SuperHeroesPage";
import RQSuperHeroes from "./components/RQSuperHeroes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      
          <BrowserRouter>
            <div>
              <Link to="/" className="link">
                Home
              </Link>
              <Link to="/super-heroes" className="link">
                Traditional Super Heroes
              </Link>
              <Link to="/rq-super-hero" className="link">
                RQ Super Heroes
              </Link>
            </div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/super-heroes" element={<SuperHeroesPage />} />
              <Route path="/rq-super-hero" element={<RQSuperHeroes />} />
            </Routes>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
