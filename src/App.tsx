import React from 'react';
import './App.css';
import { useState } from 'react';
interface Task {
  id: number;
  title: string;
  description: string;
  status: boolean
}
interface Popup {
  id: number;
  title: string;
  description: string;
  status: boolean;
  clicked: boolean
}
interface Input {
  title: string;
  isEmpty: boolean
}

function App() {
  const [title, setTitle] = useState<Input>({ title: "", isEmpty: false })
  const [description, setDescription] = useState<Input>({ title: "", isEmpty: false })
  const [task, setTask] = useState<Task[]>([])
  const [popup, setPopup] = useState<Popup>({
    id: 0,
    title: "",
    description: "",
    status: false,
    clicked: false
  })

  const buttonSubmit = () => {
    if (title.title !== "" && description.title !== "") {
      setTask((prev) => (
        [...prev, {
          id: task.length + 1,
          title: title.title,
          description: description.title,
          status: false
        }]))
    }
    else if (title.title === '') { setTitle({ title: "", isEmpty: true }) }
    else if (description.title === "") { setDescription({ title: "", isEmpty: true }) }

  }

  return (
    <div className="App">
      <div className="task_field">
        <form action="">
          <label htmlFor="title">
            <p>Title:</p>
            <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTitle({ title: e.target.value, isEmpty: false }) }} type="text" name="" id="title" placeholder='Enter title' />
            {title.isEmpty ? <p>This field is empty</p> : null}
          </label>
          <label htmlFor="description">
            <p>Description:</p>
            <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setDescription({ title: e.target.value, isEmpty: false }) }} type="text" placeholder='Enter description' id="description" />
            {description.isEmpty ? <p>This field is empty</p> : null}

          </label>
          <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            buttonSubmit()
          }} type="submit">Create</button>
        </form>
      </div>
      <div className="to_do_list">
        <ul className="list_titles">
          <li>ID</li>
          <li>TITLE</li>
          <li>DESCRIPTION</li>
          <li>STATUS</li>
        </ul>
        <div className="list_tasks">
          {task.map((el) => (<div key={el.id} className="list_task">
            <div onClick={(e) => { e.stopPropagation(); setPopup({ ...el, clicked: true }) }}><ul><li>{el.id}</li>
              <li>{el.title}</li>
              <li>{el.description}</li></ul></div>
            <div onChange={() => setPopup({ ...popup, status: popup.status })}><input type="checkbox" name="" id="" /></div>
          </div>
          ))}
          {popup.clicked ? (
            <div className="pop-up">
              <h1>{popup.title}</h1>
              <h2>Description:{popup.description}</h2>
              <h3>{popup.status}</h3>
              <div>
                <label htmlFor="status">Status: </label>

                <input type="checkbox" name="" id="status" checked={popup.status} />
              </div>
              <div><button onClick={() => setPopup({ ...popup, clicked: false })}>close</button></div>
            </div>) : null}

        </div>
      </div>

    </div >
  );
}

export default App;
