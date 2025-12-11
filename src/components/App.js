import React, { Component } from "react";
import "../styles/app.css";

class App extends Component {
  state = {
    tasks: [],
    currentTask: "",
    editIndex: null,
    editText: "",
  };

  handleInputChange = (e) => {
    this.setState({ currentTask: e.target.value });
  };

  addTask = () => {
    const { currentTask, tasks } = this.state;
    if (currentTask.trim() === "") return;
    this.setState({
      tasks: [...tasks, currentTask],
      currentTask: "",
    });
  };

  deleteTask = (index) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.filter((_, i) => i !== index);
    this.setState({ tasks: updatedTasks });
  };

  editTask = (index) => {
    this.setState({
      editIndex: index,
      editText: this.state.tasks[index],
    });
  };

  handleEditChange = (e) => {
    this.setState({ editText: e.target.value });
  };

  saveTask = () => {
    const { editIndex, editText, tasks } = this.state;
    if (editText.trim() === "") return;
    const updatedTasks = tasks.map((task, i) =>
      i === editIndex ? editText : task
    );
    this.setState({
      tasks: updatedTasks,
      editIndex: null,
      editText: "",
    });
  };

  render() {
    const { tasks, currentTask, editIndex, editText } = this.state;

    return (
      <div className="App">
        <h1>To-Do App</h1>

        {/* Add Task Section */}
        <div className="add_tasks_section">
          <input
            type="text"
            value={currentTask}
            onChange={this.handleInputChange}
            placeholder="Enter task"
          />
          <button onClick={this.addTask}>Add Task</button>
        </div>

        {/* Tasks List */}
        <div className="tasks_section">
          {tasks.map((task, index) => (
            <div className="task" key={index}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={this.handleEditChange}
                  />
                  <button className="save" onClick={this.saveTask}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{task}</span>
                  <button className="edit" onClick={() => this.editTask(index)}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => this.deleteTask(index)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
