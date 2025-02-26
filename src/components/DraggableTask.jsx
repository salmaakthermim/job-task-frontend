// import { useRef } from "react";
// import Draggable from "react-draggable";
// import { MdDelete } from "react-icons/md";

// const DraggableTask = ({ task, onStart, onDelete }) => {
//   const nodeRef = useRef(null);
//   return (
//     <Draggable nodeRef={nodeRef} onStart={() => onStart(task)} bounds="parent">
//       <div ref={nodeRef} className="border text-white p-3 mb-3 rounded-lg shadow-md flex justify-between items-center">
//         <div>
//           <h3 className="font-semibold">{task.title}</h3>
//           <p className="text-sm text-white">{task.description}</p>
//           <small>{new Date(task.timestamp).toLocaleString()}</small>
//         </div>
//         <button
//           onClick={() => onDelete(task._id)}
//           className="text-red-500 hover:text-red-700"
//         >
//           <MdDelete />
//         </button>
//       </div>
//     </Draggable>
//   );
// };

// export default DraggableTask;



import { useState, useRef } from "react";
import Draggable from "react-draggable";
import { MdDelete, MdEdit } from "react-icons/md";

const DraggableTask = ({ task, onStart, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const nodeRef = useRef(null);

  const handleSave = () => {
    // Update the task using onUpdate callback
    onUpdate(task._id, { title: editedTitle, description: editedDescription });
    setIsEditing(false);
  };

  return (
    <Draggable nodeRef={nodeRef} onStart={() => onStart(task)} bounds="parent">
      <div
        ref={nodeRef}
        className="border text-white p-3 mb-3 rounded-lg shadow-md flex justify-between items-center"
      >
        <div className="flex-grow">
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="mb-2 p-1 w-full text-black"
                maxLength={50}
                required
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="p-1 w-full text-black"
                maxLength={200}
              />
            </div>
          ) : (
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm">{task.description}</p>
              <small>{new Date(task.timestamp).toLocaleString()}</small>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="text-green-500 hover:text-green-700"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700"
            >
              <MdEdit />
            </button>
          )}
          <button
            onClick={() => onDelete(task._id)}
            className="text-red-500 hover:text-red-700"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </Draggable>
  );
};

export default DraggableTask;
