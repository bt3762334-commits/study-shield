import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Header />

        <main className="container" style={{ padding: "20px" }}>
          {children}
        </main>
      </div>

    </div>
  );
};

export default MainLayout;
