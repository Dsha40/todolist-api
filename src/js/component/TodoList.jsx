import React, { useState, useEffect } from "react";

import {
	addUser,
	addTasksUser,
	resolveTask,
	deleteAllTasks
} from "./functions.jsx";

export function TodoList() {
	const [task, setTask] = useState("");
	const [taskListArray, setTaskListArray] = useState([]);
	const [viewError, setError] = useState(false);
	const [visible, setVisible] = useState("disable");

	const clear = () => {
		setTask("");
		setError(false);
	};

	useEffect(() => {
		addUser().then(() => resolveTask(setTaskListArray));
	}, []);

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
					onKeyPress={async e => {
						if (e.key == "Enter") {
							await addTasksUser([
								...taskListArray,
								{ label: task, done: false }
							]);
							await resolveTask(setTaskListArray);
							setTask("");
						}
					}}
				/>
			</div>

			{viewError && (
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
							key={index}
							onMouseEnter={e => setVisible("visible")}
							onMouseLeave={e => setVisible("disable")}>
							{task.label}
							<div
								className={"btn erase-task" + visible}
								onClick={async e => {
									let filterTasks = taskListArray.filter(
										t => t.label != task.label
									);
									await addTasksUser(filterTasks);
									await resolveTask(setTaskListArray);
								}}
								onMouseEnter={e => setVisible("visible")}
								onMouseLeave={e => setVisible("disable")}>
								✖
							</div>
						</li>
					);
				})}
			</ul>
			<button
				onClick={async e => {
					await deleteAllTasks();
					location.reload();
				}}
				className="btn btn-danger">
				Delete all task
			</button>
			<div className="task-counter mt-2">
				{taskListArray.length === 0
					? "No task, add a task"
					: `${taskListArray.length} Task to do`}
			</div>
		</div>
	);
}
