import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout({ children }) {
  return (
    <div className="flex bg-bg text-text min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Header />
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
