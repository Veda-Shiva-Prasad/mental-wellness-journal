import React, { useState, useEffect } from "react";
import "./journal.css";

export default function Journal({ onLogout }) {
  const [mood, setMood] = useState("");
  const [entry, setEntry] = useState("");
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const token = localStorage.getItem("token");

  // Fetch journal entries
  useEffect(() => {
    async function fetchJournals() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:5000/api/journals", {
          headers: { Authorization: "Bearer " + token },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setJournals(data);
      } catch {
        setError("Failed to load journals.");
      }
      setLoading(false);
    }
    fetchJournals();
  }, [token]);

  async function handleAdd(e) {
    e.preventDefault();
    if (!entry.trim()) return;
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/journals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ entry: `${mood ? mood + ": " : ""}${entry}` }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setJournals([data, ...journals]);
      setEntry("");
      setMood("");
    } catch {
      setError("Failed to add journal.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this entry?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/journals/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      if (!res.ok) throw new Error();
      setJournals(journals.filter((j) => j._id !== id));
    } catch {
      setError("Failed to delete journal.");
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (!editValue.trim()) return;
    try {
      const res = await fetch(`http://localhost:5000/api/journals/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ entry: editValue }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setJournals(journals.map((j) => (j._id === editId ? data : j)));
      setEditId(null);
      setEditValue("");
    } catch {
      setError("Failed to update journal.");
    }
  }

  function parseMoodAndEntry(text) {
    const parts = text.split(":");
    if (parts.length > 1) {
      return { mood: parts[0].trim(), entry: parts.slice(1).join(":").trim() };
    }
    return { mood: "", entry: text };
  }

  return (
    <div className="journal-page">
      <div className="journal-container">
        <h1 className="journal-title">Mental Wellness Journal</h1>

        <form onSubmit={handleAdd} className="journal-form">
          <input
            type="text"
            className="mood-input"
            placeholder="Mood (ex: Calm, Excited, Stressed)"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />
          <textarea
            className="entry-input"
            rows={4}
            placeholder="Journal Entry (your thoughts or notes today...)"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
          <button type="submit" className="save-btn">
            Save
          </button>
        </form>

        {error && <div className="error-msg">{error}</div>}

        <h2 className="entries-heading">Entries</h2>

        <div className="entries-list">
          {loading ? (
            <p className="loading-text">Loading…</p>
          ) : journals.length === 0 ? (
            <p className="empty-text">No entries yet. Start journaling!</p>
          ) : (
            journals.map((j) => {
              const { mood: jMood, entry: jEntry } = parseMoodAndEntry(j.entry);
              return (
                <div key={j._id} className="entry-card">
                  <div className="entry-header">
                    {jMood && <span className="entry-mood">{jMood}</span>}
                    <span className="entry-date">
                      {new Date(j.date).toLocaleString("en-US", {
                        month: "numeric",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                    <div className="entry-actions">
                      <button
                        className="icon-btn edit-icon"
                        onClick={() => {
                          setEditId(j._id);
                          setEditValue(j.entry);
                        }}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        className="icon-btn delete-icon"
                        onClick={() => handleDelete(j._id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {editId === j._id ? (
                    <form onSubmit={handleUpdate} className="edit-form">
                      <textarea
                        className="edit-textarea"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        rows={3}
                      />
                      <div className="edit-buttons">
                        <button type="submit" className="save-edit-btn">
                          Save
                        </button>
                        <button
                          type="button"
                          className="cancel-edit-btn"
                          onClick={() => {
                            setEditId(null);
                            setEditValue("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <p className="entry-text">{jEntry}</p>
                  )}
                </div>
              );
            })
          )}
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
