import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddTask from "./pages/AddTask"; 

const API_URL = "http://localhost:5000/tasks"; // Update with your backend URL

const App = () => {
  const [tasks, setTasks] = useState([]);
  console.log("App Rendered", tasks);

  // Fetch tasks from MongoDB
  useEffect(() => {
    console.log("Fetching tasks")
    axios.get(API_URL)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  },[]);


  // Add Task
 const handleAddTask = (task) => {

  console.log("Adding task:", task);
  axios.post(API_URL, task)
    .then(() => axios.get(API_URL))  // Fetch updated task list
    .then((res) => setTasks(res.data))
    .catch((err) => console.error("Error adding task:", err));
};



  // Delete Task (Fixed Template String)
  const handleDeleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch((err) => console.error(err));
  };

  // Handle Drag & Drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const updatedTasks = [...tasks];

    // Find the dragged task
    const draggedTask = updatedTasks[source.index];
    draggedTask.category = destination.droppableId; // Update category

    // Remove and reinsert at new position
    updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, draggedTask);

    // Update UI instantly
    setTasks(updatedTasks);

    // Update database (Fixed Template String)
    axios.put(`${API_URL}/${draggedTask._id}`, { category: draggedTask.category })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Task Management</h1>

      {/* Add Task Form */}
      {/* <AddTask onAddTask={handleAddTask} /> */}
      

      {/* Drag & Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-6">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-200 p-4 rounded-md min-h-[300px]"
                >
                  <h2 className="text-xl font-semibold text-center mb-4">{category}</h2>
                  {tasks
                    .filter(task => task.category === category)
                    .map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="bg-white p-3 mb-3 rounded-lg shadow-md flex justify-between items-center"
                          >
                            <div>
                              <h3 className="font-semibold">{task.title}</h3>
                              <p className="text-sm text-gray-600">{task.description}</p>
                            </div>
                            <button
                              onClick={() => handleDeleteTask(task._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ❌
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
