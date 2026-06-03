import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  // get all issues from backend
  const getIssues = async () => {
    try {
      const response = await axios.get(
        "https://mini-task-tracker-7a3a.onrender.com/issues",
      );
      setIssues(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // run when page loads
  useEffect(() => {
    getIssues();
  }, []);

  // add new task
  const addTask = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://mini-task-tracker-7a3a.onrender.com/issues", {
        title,
        description,
        priority,
        dueDate,
      });

      setTitle("");
      setDescription("");

      getIssues();
    } catch (error) {
      console.log(error);
    }
  };

  // change task status
  const changeStatus = async (id, status) => {
    let updatedStatus = "";

    if (status === "Open") {
      updatedStatus = "In Progress";
    } else if (status === "In Progress") {
      updatedStatus = "Closed";
    } else {
      updatedStatus = "Open";
    }

    try {
      await axios.put(
        `https://mini-task-tracker-7a3a.onrender.com/issues/${id}`,
        {
          status: updatedStatus,
        },
      );

      getIssues();
    } catch (error) {
      console.log(error);
    }
  };

  // delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `https://mini-task-tracker-7a3a.onrender.com/issues/${id}`,
      );

      getIssues();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Mini Task Tracker</h2>

      {/* form */}
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter task title"
          className="form-control mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Enter description"
          className="form-control mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <select
          className="form-control mb-3"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <input
          type="date"
          className="form-control mb-3"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button className="btn btn-primary mb-4">Add Task</button>
      </form>

      {/* task cards */}
      <div className="row">
        {issues.map((task) => (
          <div className="col-md-4 mb-3" key={task.id}>
            <div className="card p-3">
              <h5>{task.title}</h5>

              <p>{task.description}</p>

              <p>
                <strong>Status:</strong> {task.status}
              </p>

              <p>
                <strong>Priority:</strong> {task.priority}
              </p>

              <p>
                <strong>Due Date:</strong> {task.due_date}
              </p>

              <button
                className="btn btn-warning mb-2"
                onClick={() => changeStatus(task.id, task.status)}
              >
                Change Status
              </button>

              <button
                className="btn btn-danger"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
