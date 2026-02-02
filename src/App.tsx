import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const totalGlasses = 8;

  // 🌅 Daily-aware state
  const [glasses, setGlasses] = useState<number>(() => {
    const saved = Number(localStorage.getItem("glasses")) || 0;
    const savedDate = localStorage.getItem("lastDate");
    const today = new Date().toDateString();

    return savedDate === today ? saved : 0;
  });

  // 💾 Persist state
  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem("glasses", String(glasses));
    localStorage.setItem("lastDate", today);
  }, [glasses]);

  const handleDrink = () => {
    if (glasses < totalGlasses) {
      setGlasses(glasses + 1);
    }
  };

  const waterHeight = (glasses / totalGlasses) * 100;

  return (
    <div className="app">
      {/* 🌫️ Floating bubbles */}
      <div className="bubbles">
        <span className="bubble b1" />
        <span className="bubble b2" />
        <span className="bubble b3" />
        <span className="bubble b4" />
      </div>

      <div className="card">
        <h1 className="title">Water Intake</h1>

        <p className="date">
          Today • {new Date().toLocaleDateString()}
        </p>

        <p className="goal">
          Goal: {totalGlasses} glasses
        </p>


        <p className="subtitle">
          {glasses === totalGlasses
            ? "All set for today ✨"
            : "Drink gently. Stay hydrated."}
        </p>

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
