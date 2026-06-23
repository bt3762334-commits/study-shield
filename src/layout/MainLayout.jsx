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
        <footer
  style={{
    textAlign: "center",
    padding: "20px",
    color: "#9ca3af",
  }}
>
  <p>Dark Byte © 2026</p>
  <p>باسم طه</p>
  <p>01091291823</p>
</footer>
      </div>

    </div>
  );
};

export default MainLayout;
