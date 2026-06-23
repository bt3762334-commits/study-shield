import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Quran from "./pages/Quran";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/quran" element={<Quran />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
