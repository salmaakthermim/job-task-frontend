import { useRef } from "react";
import Draggable from "react-draggable";

const DraggableTask = ({ task, onStart, onDelete }) => {
  const nodeRef = useRef(null);
  return (
    <Draggable nodeRef={nodeRef} onStart={() => onStart(task)} bounds="parent">
      <div ref={nodeRef} className="border text-white p-3 mb-3 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-white">{task.description}</p>
          <small>{new Date(task.timestamp).toLocaleString()}</small>
        </div>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 hover:text-red-700"
        >
          ❌
        </button>
      </div>
    </Draggable>
  );
};

export default DraggableTask;
