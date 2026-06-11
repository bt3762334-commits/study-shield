import MainLayout from "../layout/MainLayout";
import { exportData } from "../services/exportData";

export default function Settings() {

  const resetData = () => {

    if (
      window.confirm(
        "هل أنت متأكد من حذف جميع البيانات؟"
      )
    ) {

      localStorage.clear();

      window.location.reload();
    }
  };

  return (
    <MainLayout>

      <div className="settings-page">

        <h1>
          ⚙️ الإعدادات
        </h1>

        <div className="settings-card">

          <h3>
            النسخة الاحتياطية
          </h3>

          <button
            onClick={exportData}
          >
            📤 تصدير البيانات
          </button>

        </div>

        <div className="settings-card">

          <h3>
            إعادة ضبط التطبيق
          </h3>

          <button
            className="danger-btn"
            onClick={resetData}
          >
            🗑 حذف جميع البيانات
          </button>

        </div>

      </div>

    </MainLayout>
  );
}
