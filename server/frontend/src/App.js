import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [journals, setJournals] = useState([]);
  const [mood, setMood] = useState("");
  const [entry, setEntry] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.className = dark ? "darktheme" : "";
  }, [dark]);

  const fetchJournals = async () => {
    setLoading(true);
    const res = await axios.get("http://localhost:5000/api/journals");
    setJournals(res.data.reverse());
    setLoading(false);
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood || !entry) return;
    if (editId) {
      await axios.put(`http://localhost:5000/api/journals/${editId}`, {
        mood,
        entry,
      });
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/journals", { mood, entry });
    }
    setMood("");
    setEntry("");
    fetchJournals();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/journals/${id}`);
    setJournals(journals.filter((j) => j._id !== id));
  };

  const handleEdit = (j) => {
    setMood(j.mood);
    setEntry(j.entry);
    setEditId(j._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="App-container">
      <div className="heading-block">
        <h2>Mental Wellness Journal</h2>
        <div className="tagline">
          Jot your moods and reflect on your journey 🌱
        </div>
        <button
          className="theme-btn"
          onClick={() => setDark(!dark)}
          title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
      <form onSubmit={handleSubmit} style={{ marginBottom: 18 }}>
        <input
          placeholder="Mood (ex: Calm, Excited, Stressed)"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          required
        />
        <textarea
          placeholder="Journal Entry (your thoughts or notes today...)"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          required
        />
        <button type="submit">{editId ? "Update" : "Save"}</button>
        {editId && (
          <button
            type="button"
            className="action-btn"
            onClick={() => {
              setEditId(null);
              setMood("");
              setEntry("");
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <h3 style={{ marginTop: 30 }}>Entries</h3>
      {loading ? (
        <div>Loading...</div>
      ) : journals.length ? (
        journals.map((j) => (
          <div className="journal-card" key={j._id}>
            <div>
              <span className="entry-title">{j.mood}</span>
              <span className="entry-date">
                {new Date(j.date).toLocaleString()}
              </span>
            </div>
            <div className="entry-content">{j.entry}</div>
            <div className="card-actions">
              <button className="action-btn" onClick={() => handleEdit(j)}>
                ✏️
              </button>
              <button
                className="action-btn"
                onClick={() => handleDelete(j._id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))
      ) : (
        <div style={{ color: "#888" }}>No entries yet.</div>
      )}
    </div>
  );
}

export default App;
