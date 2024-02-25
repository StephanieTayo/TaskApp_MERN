import "./App.css";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  API_URL = "http://localhost:5038";

  componentDidMount() {
    this.refreshTasks();
  }

  async refreshTasks() {
    fetch(this.API_URL + "/api/taskapp/GetTasks")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ tasks: data });
      });
  }

  async addClick() {
    var newTasks = document.getElementById("newTasks").value;
    const data = new FormData();
    data.append("newTasks", newTasks);

    fetch(this.API_URL + "/api/taskapp/AddTasks", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(data);
        alert(result);
        this.refreshTasks();
      });
  }

  async deleteClick(id) {
    fetch(this.API_URL + "/api/taskapp/DeleteTasks?id=" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refreshTasks();
      });
  }

  render() {
    const { tasks } = this.state;
    return (
      <div className="App">
        <h2>Task Application</h2>
        <input id="newTasks" />
        &nbsp;&nbsp;
        <button onClick={() => this.addClick()}>Add Task</button>
        {tasks.map((task) => (
          <p>
            <b>* {task.description} </b>
            <button onClick={() => this.deleteClick(task.id)}>
              Delete Task
            </button>
          </p>
        ))}
      </div>
    );
  }
}
export default App;
