import React, { Component } from "react";
import "../styles/App.css";

class App extends Component {
  state = {
    newTask: "",
    tasks: [], 
  };

  handleChange = (e) => {
    this.setState({ newTask: e.target.value });
  };

  addTask = () => {
    const { newTask, tasks } = this.state;
    if (newTask.trim() === "") return;
    this.setState({
      tasks: [...tasks, { text: newTask, isEditing: false }],
      newTask: "",
    });
  };

  deleteTask = (index) => {
    const tasks = [...this.state.tasks];
    tasks.splice(index, 1);
    this.setState({ tasks });
  };

  editTask = (index) => {
    const tasks = [...this.state.tasks];
    tasks[index].isEditing = true;
    this.setState({ tasks });
  };

  handleEditChange = (e, index) => {
    const tasks = [...this.state.tasks];
    tasks[index].text = e.target.value;
    this.setState({ tasks });
  };

  saveTask = (index) => {
    const tasks = [...this.state.tasks];
    tasks[index].isEditing = false;
    this.setState({ tasks });
  };

  render() {
    return (
      <div>
        <h1>To-Do App</h1>
        <div className="add_tasks_section">
          <textarea
            placeholder="Enter task"
            value={this.state.newTask}
            onChange={this.handleChange}
          ></textarea>
          <button onClick={this.addTask}>Add</button>
        </div>

        <div className="tasks_section">
          {this.state.tasks.map((task, index) => (
            <div className="task" key={index}>
              {task.isEditing ? (
                <>
                  <textarea
                    value={task.text}
                    onChange={(e) => this.handleEditChange(e, index)}
                  ></textarea>
                  <button className="save" onClick={() => this.saveTask(index)}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{task.text}</span>
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
