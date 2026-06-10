import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}
