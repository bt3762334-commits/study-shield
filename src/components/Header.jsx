const Header = () => {
  return (
    <header
      className="glass"
      style={{
        padding: "15px 25px",
        margin: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ fontWeight: "bold" }}>
        Dark Byte 🚀
      </h2>

      <div>
        <button className="btn btn-primary">
          Dashboard
        </button>
      </div>
    </header>
  );
};

export default Header;
