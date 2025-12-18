import React from "react";
import "./../styles/App.css";
import { useState } from "react";

const App = () => {
  const [item, Setitem] = useState([]);
  const [value, Setvalue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  function handleDelete(i) {
    return item.filter((elem, index) => index !== i);
  }

  function handleEdit(i) {
    setEditIndex(i);
    setEditValue(item[i]);
  }

  function saveTask(i) {
    let updated = [...item];
    updated[i] = editValue;
    Setitem(updated);
    setEditIndex(null);
  }

  return (
    <div>
      <div className="add_tasks_section" style={{ textAlign: "center" }}>
        <h3>To Do List</h3>
        <textarea
          placeholder="Enter The Todos"
          value={value}
          onChange={(e) => Setvalue(e.target.value)}
        />
        <button onClick={() => Setitem([...item, value])}>Add Todo</button>
      </div>

      <div className="tasks_section">
        {item.length > 0 && (
          <ul>
            {item.map((elem, index) => (
              <React.Fragment key={index}>
                <li className="task">
                  {editIndex === index ? (
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                  ) : (
                    elem
                  )}
                </li>

                {editIndex === index ? (
                  <button className="save" onClick={() => saveTask(index)}>
                    Save
                  </button>
                ) : (
                  <>
                    <button className="edit" onClick={() => handleEdit(index)}>
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => Setitem(handleDelete(index))}
                    >
                      Delete
                    </button>
                  </>
                )}
              </React.Fragment>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;