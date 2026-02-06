import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const DRINK_ML = 250;

  // 🌅 Load daily goal (ml)
  const [dailyGoal, setDailyGoal] = useState<number | null>(() => {
    const savedGoal = localStorage.getItem("dailyGoal");
    return savedGoal ? Number(savedGoal) : null;
  });

  // 🌅 Daily-aware intake
  const [intake, setIntake] = useState<number>(() => {
    const saved = Number(localStorage.getItem("intake")) || 0;
    const savedDate = localStorage.getItem("lastDate");
    const today = new Date().toDateString();
    return savedDate === today ? saved : 0;
  });

  // 💾 Persist intake + date
  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem("intake", String(intake));
    localStorage.setItem("lastDate", today);
  }, [intake]);

  // 💾 Persist goal
  useEffect(() => {
    if (dailyGoal !== null) {
      localStorage.setItem("dailyGoal", String(dailyGoal));
    }
  }, [dailyGoal]);

  const handleDrink = () => {
    if (dailyGoal && intake < dailyGoal) {
      setIntake(Math.min(intake + DRINK_ML, dailyGoal));
    }
  };

  const resetAll = () => {
    setIntake(0);
    setDailyGoal(null);
    localStorage.removeItem("dailyGoal");
  };

  // % fill for bottle
  const waterHeight =
    dailyGoal ? (intake / dailyGoal) * 100 : 0;

  // ─────────────────────────────────────────────

  // 🌱 GOAL SELECTION SCREEN
  if (dailyGoal === null) {
    return (
      <div className="app">
        <div className="card">
          <h1 className="title">Water Intake</h1>
          <p className="subtitle">Choose your goal for today</p>

          <div className="goal-options">
            <div className="goal-card" onClick={() => setDailyGoal(2000)}>
              <h3>2 L</h3>
              <p>Light</p>
            </div>

            <div className="goal-card" onClick={() => setDailyGoal(2500)}>
              <h3>2.5 L</h3>
              <p>Recommended</p>
            </div>

            <div className="goal-card" onClick={() => setDailyGoal(3000)}>
              <h3>3 L</h3>
              <p>Active</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 🌊 TRACKING SCREEN
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

        <p className="subtitle">
          Goal: {(dailyGoal / 1000).toFixed(1)} L
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
          {(intake / 1000).toFixed(2)} /{" "}
          {(dailyGoal / 1000).toFixed(1)} L
        </p>

        <button
          className="drink-btn"
          onClick={handleDrink}
          disabled={intake === dailyGoal}
        >
          {intake === dailyGoal
            ? "All set for today 💙"
            : "+ 250 ml"}
        </button>

        <button className="reset-btn" onClick={resetAll}>
          Change goal
        </button>
      </div>
    </div>
  );
}

export default App;
