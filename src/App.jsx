// import { useEffect, useState } from "react";
// import axios from "axios";
// import DraggableTask from "./components/DraggableTask";
// // import DraggableTask from "./DraggableTask";

// const API_URL = "https://job-task-server-seven-beta.vercel.app/tasks"; // Update with your backend URL

// const App = () => {
//   const [tasks, setTasks] = useState([]);
//   const [draggedTask, setDraggedTask] = useState(null);

//   useEffect(() => {
//     axios
//       .get(API_URL)
//       .then((res) => setTasks(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleAddTask = (task) => {
//     axios
//       .post(API_URL, task)
//       .then(() => axios.get(API_URL))
//       .then((res) => setTasks(res.data))
//       .catch((err) => console.error("Error adding task:", err));
//   };

//   const handleDeleteTask = (id) => {
//     axios
//       .delete(`${API_URL}/${id}`)
//       .then(() => setTasks(tasks.filter((task) => task._id !== id)))
//       .catch((err) => console.error(err));
//   };

//   const handleDragStart = (task) => {
//     setDraggedTask(task);
//   };

//   const handleDrop = (category) => {
//     if (draggedTask) {
//       const updatedTasks = tasks.map((task) =>
//         task._id === draggedTask._id ? { ...task, category } : task
//       );
//       setTasks(updatedTasks);

//       // Update database
//       axios
//         .put(`${API_URL}/${draggedTask._id}`, { category })
//         .catch((err) => console.error(err));
//       setDraggedTask(null);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-20 mt-14">Task Management</h1>
//       <div className="grid lg:grid-cols-3 gap-6">
//         {["To-Do", "In Progress", "Done"].map((category) => (
//           <div
//             key={category}
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={() => handleDrop(category)}
//             className="bg-gray-800 p-4 rounded-md min-h-[300px]"
//           >
//             <h2 className="text-xl font-semibold text-white text-center mb-4">
//               {category}
//             </h2>
//             {tasks
//               .filter((task) => task.category === category)
//               .map((task) => (
//                 <DraggableTask
//                   key={task._id}
//                   task={task}
//                   onStart={handleDragStart}
//                   onDelete={handleDeleteTask}
//                 />
//               ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;



import { useEffect, useState } from "react";
import axios from "axios";
import DraggableTask from "./components/DraggableTask";

const API_URL = "https://job-task-server-seven-beta.vercel.app/tasks"; // Update with your backend URL

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get(API_URL)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  };

  // Add Task (not fully shown here)
  const handleAddTask = (task) => {
    axios
      .post(API_URL, task)
      .then(() => fetchTasks())
      .catch((err) => console.error("Error adding task:", err));
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => setTasks(tasks.filter((task) => task._id !== id)))
      .catch((err) => console.error(err));
  };

  // Update a task (e.g. title and description)
  const handleUpdateTask = (id, updatedData) => {
    axios
      .put(`${API_URL}/${id}`, updatedData)
      .then(() => fetchTasks())
      .catch((err) => console.error("Error updating task:", err));
  };

  // Handle drag start (to keep track of which task is moving)
  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  // Handle drop (to update task category)
  const handleDrop = (category) => {
    if (draggedTask) {
      // Update task locally
      const updatedTasks = tasks.map((task) =>
        task._id === draggedTask._id ? { ...task, category } : task
      );
      setTasks(updatedTasks);

      // Persist category update
      axios
        .put(`${API_URL}/${draggedTask._id}`, { category })
        .catch((err) => console.error(err));
      setDraggedTask(null);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-20 mt-14">
        Task Management
      </h1>
      <div className="grid lg:grid-cols-3 gap-6">
        {["To-Do", "In Progress", "Done"].map((category) => (
          <div
            key={category}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(category)}
            className="bg-gray-800 p-4 rounded-md min-h-[300px]"
          >
            <h2 className="text-xl font-semibold text-white text-center mb-4">
              {category}
            </h2>
            {tasks
              .filter((task) => task.category === category)
              .map((task) => (
                <DraggableTask
                  key={task._id}
                  task={task}
                  onStart={handleDragStart}
                  onDelete={handleDeleteTask}
                  onUpdate={handleUpdateTask}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
