import { useNavigate } from "react-router-dom";

export default function BackButton() {

  const navigate = useNavigate();

  return (
    <button
      className="back-btn"
      onClick={() => navigate("/")}
    >
      ← العودة للرئيسية
    </button>
  );
}
