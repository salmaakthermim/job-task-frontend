import { useState } from "react";

const AddTask = ({ onAddTask }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return alert("Task title is required!");
    onAddTask(task);
    setTask({ title: "", description: "", category: "To-Do" }); // Reset form
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="bg-white  w-9/12 mx-auto mb-20 p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mt-16 text-center">Add New Task</h2>

        <div className="mb-2">
          <label className="block font-medium">Task Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            maxLength="50"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-2">
          <label className="block font-medium">Task Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            maxLength="200"
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div className="mb-2">
          <label className="block font-medium">Category</label>
          <select
            name="category"
            value={task.category}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Add Task ➕
        </button>
      </form>
    </div>
  );
};

export default AddTask;
