import { FormControl, List, TextField } from "@material-ui/core"
// import { AddToPhotosIcon } from"@material-ui/icons/AddToPhotos"
import React, { VFC, useState, useEffect } from 'react';
import './App.css';
import { db } from "./firebase"
import { TaskItem } from "./TaskItem";

import { auth } from "./firebase"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"

const App: React.FC = (props: any) => {
  const [ tasks, setTasks ] = useState([{id:"", title: ""}])
  const [ input, setInput ] = useState("")

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user)=>{
        !user && props.history.push("login")
    })
    return () => unSub()
})
  useEffect(()=> {
    const unSub = db.collection("tasks").onSnapshot((snapshot)=>{
      setTasks(
        snapshot.docs.map((doc)=>({id: doc.id, title: doc.data().title }))
    )
    })
    return () => unSub()
  }, [])

  const newTask = (e: React.MouseEvent<HTMLButtonElement>)=> {
    db.collection("tasks").add({ title: input })
    setInput("")
  }
  return (
    <div className="App">
      <h1>Todo App by React/Firebase</h1>
      <button
        onClick={
          async () => {
            try {
              await auth.signOut()
              props.history.push("login")
            } catch (error: any) {
              alert(error.message)
            }
          }}
      >
        <ExitToAppIcon />
      </button>
      <FormControl>
        <TextField
          // InputLabelProps={(
          //   shrink: true,
          // )}
          label="New task ?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />
      </FormControl>
      <button disabled={!input} onClick={newTask}>
        {/* <AddToPhotosIcon /> */}
        icon
      </button>
      <List>
      {tasks.map((task) => {
        <h3 key={task.id}>
          <TaskItem key={task.id} id={task.id} title={task.title} />
        </h3>
      })}
      </List>
    </div>
  );
}

export default App;
