import React, { useEffect, useState } from "react";

// docker-compose এ backend service এর নাম দিয়ে যোগাযোগ হবে,
// কিন্তু ব্রাউজার থেকে কল হয় বলে এখানে host machine এর port ব্যবহার হচ্ছে
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "PUT" });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>MERN Task Manager</h1>

      <form onSubmit={addTask} style={{ display: "flex", gap: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="নতুন task লিখুন..."
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">যোগ করুন</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
        {tasks.map((task) => (
          <li
            key={task._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 8,
              borderBottom: "1px solid #ddd",
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            <span onClick={() => toggleTask(task._id)} style={{ cursor: "pointer" }}>
              {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)}>মুছুন</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
