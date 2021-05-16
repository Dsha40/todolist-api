import React, { useState } from "react";

export function TodoList() {
	const [task, setTask] = useState("");
	const [taskListArray, setTaskListArray] = useState([]);
	const [error, setError] = useState(false);

	const addTask = event => {
		if (task === "") {
			setError(true);
			return;
		}
		if (event.key == "Enter") {
			setTaskListArray([...taskListArray, task]);
			setTask("");
			setError(false);
		}
	};

	const deleteTask = id => {
		const newTaskListArray = taskListArray.filter((task, index) => {
			return index != id;
		});
		console.log(id);
		setTaskListArray(newTaskListArray);
	};

	const clear = () => {
		setTask("");
		setError(false);
	};

	return (
		<div className="container p-3 mt-5 bg-secondary text-black">
			<h1 className="display-1 text-center text-white">todos</h1>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Press Enter to add a new task"
					onBlur={() => setError(false)}
					onChange={event => {
						setTask(event.target.value);
						setError(false);
					}}
					value={task}
					onKeyUp={addTask}
				/>
			</div>
			{error && (
				<div className="alert alert-danger" role="alert">
					A simple primary alert—check it out!
				</div>
			)}
			<ul className="list-group">
				{taskListArray.map((task, index) => {
					return (
						<li
							className="list-group-item d-flex justify-content-between bg-info"
							id="liMap"
							key={index}>
							{task}
							<div
								className="btn erase-task"
								title="Delete task"
								onClick={() => {
									deleteTask(index);
								}}>
								&times;
							</div>
						</li>
					);
				})}
			</ul>
			<div className="task-counter mt-2">
				{taskListArray.length === 0
					? "No task, add a task"
					: `${taskListArray.length} Task to do`}
			</div>
		</div>
	);
}
