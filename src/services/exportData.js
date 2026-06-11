export function exportData() {

  const data = {
    tasks:
      JSON.parse(
        localStorage.getItem("tasks")
      ) || [],

    lessons:
      JSON.parse(
        localStorage.getItem("lessons")
      ) || [],

    lectures:
      JSON.parse(
        localStorage.getItem("lectures")
      ) || []
  };

  const blob = new Blob(
    [
      JSON.stringify(
        data,
        null,
        2
      )
    ],
    {
      type:
        "application/json"
    }
  );

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;

  a.download =
    "study-shield-backup.json";

  a.click();

  URL.revokeObjectURL(url);
}
