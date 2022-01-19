import React,{ useState} from 'react';
import { ListItem, TextField, Grid, List } from '@material-ui/core';
import { DeleteOutlineOutlined } from '@material-ui/icons';
import { EditOutlined } from '@material-ui/icons';
import { db } from "./firebase"

interface PROPS {
    id: string
    title: string
}

export const TaskItem: React.FC<PROPS> = (props) => {
    const [ title, setTitle ] = useState(props.title)
    const editTask=()=>{
        db.collection("tasks").doc(props.id).set({ title: title }, { merge: true })
    }
    const deleteTask = () => {
        db.collection("tasks").doc(props.id).delete()
    }
  return <div>
      <ListItem>
          <h2>
              {props.title}
          </h2>
          <Grid container justifyContent='flex-end'>
                <TextField
                    InputLabelProps={{
                        shrink: true,
                    }}
                    label="Edit task"
                    value = {title}
                    onChange = {(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTitle(e.target.value)
                    }
                />
                <button onClick={editTask}>
                    <EditOutlined />
                </button>
                <button onClick={deleteTask}>
                    <DeleteOutlineOutlined />
                </button>
          </Grid>
          </ListItem>
  </div>;
};
