import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // ✅ 1. Load saved value
  const [glasses, setGlasses] = useState<number>(() => {
    return Number(localStorage.getItem("glasses")) || 0;
  });

  const totalGlasses = 8;

  // ✅ 2. Save whenever glasses change
  useEffect(() => {
    localStorage.setItem("glasses", String(glasses));
  }, [glasses]);

  const handleDrink = () => {
    if (glasses < totalGlasses) {
      setGlasses(glasses + 1);
    }
  };

  const waterHeight = (glasses / totalGlasses) * 100;

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Water Intake</h1>
        <p className="subtitle">Drink gently. Stay hydrated.</p>

        <div className="bottle-area">
          <div className="bottle">
            <div
              className="water"
              style={{ height: `${waterHeight}%` }}
            />
          </div>
        </div>

        <p className="count">
          {glasses} / {totalGlasses} glasses
        </p>

        <button
          className="drink-btn"
          onClick={handleDrink}
          disabled={glasses === totalGlasses}
        >
          {glasses === totalGlasses
            ? "You're hydrated 💙"
            : "+ I drank water"}
        </button>

        {/* 🔄 Reset button */}
        <button
          className="reset-btn"
          onClick={() => setGlasses(0)}
        >
          Reset
        </button>
      </div>
    </div>
  );

}

export default App;
