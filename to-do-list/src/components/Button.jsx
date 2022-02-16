import { Fragment, useEffect } from "react";
import { useState } from "react";

export default function CreateTaskInput(value) {
    // const tasks = window.base.tasks[0].name;
    const [task, setTask] = useState("");
    const counter = () => window.base.increment();
    useEffect(() => {
        window.base.subscribe(() => {
            setTask(window.base.tasks[window.base.tasks.length-1].name);
        });
    }, [])
    return (
        <div key={Date.now()+123}>
        <button onClick={counter}>Click me</button>
        <p>{task}</p>
        </div>
    );
}