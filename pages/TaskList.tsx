import React, {useState} from "react";

export default function TaskList(){

    const[task, setTask]=useState("");
    const [name,setName] = useState("");
    const [comment, setComment] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const checked = ()=>{
        setIsComplete(prevState => !prevState)
    }
    const [toDos, setToDos] = useState([]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const newToDo = {
          task: task,
          name: name,
          comment: comment,
          isComplete: isComplete
        };
      };
    


    return (
        <div className="task-container">
            <input
                type="text"
                value={task}
                placeholder="Add the Task"
                onChange={(event)=>setTask(event.target.value)}
            />
            <input
                type="text"
                value={name}
                placeholder="Who will do it?"
                onChange={(event)=>setName(event.target.value)}
            />
            <input
                type="textbox"
                value={name}
                placeholder="add comments"
                onChange={(event)=>setComment(event.target.value)}
            />
            <button
            onClick={handleSubmit}
            >
                add new task
            </button>

        </div>
    )    
}
