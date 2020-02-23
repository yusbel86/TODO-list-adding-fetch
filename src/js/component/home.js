import React, { useState, useEffect } from "react";

//create your first component
export function Home() {
	const [list, setList] = useState([]);
	const [content, setContent] = useState([]);

	function getToDo() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ipince")
			.then(resp => resp.json())
			.then(data => {
				setList(data);
				console.log("getToDo", data);
			});
	}

	function getValues() {
		let obj = {
			label: "make breakfast", //document.getElementById("chkDo").value,
			done: false //document.getElementById("txtTask").value
		};
		return obj;
	}

	function saveToDo(listToSave) {
		console.log("***update***", listToSave);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ipince", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(listToSave)
		})
			.then(resp => resp.json())
			.then(data => {
				console.log("saveToDo", data);
				getToDo();
				alert("Update OK!");
			});
	}

	function deleteToDo() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ipince", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => {
				console.log("deleteToDo", data);
				newToDo();
				getToDo();
				alert("Clean OK!");
			});
	}
	function newToDo() {
		const emptyArray = [];
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ipince", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(emptyArray)
		})
			.then(resp => resp.json())
			.then(data => {
				console.log("deleteToDo", data);
				getToDo();
			});
	}
	useEffect(() => {
		getToDo();
	}, []);

	return (
		<>
			<div className="container">
				<h1>To Do List</h1>

				<div className="form-group">
					<label>
						Task: &nbsp;&nbsp;
						<input
							type="txtTask"
							placeholder="Add task"
							value={content}
							onChange={e => setContent(e.target.value)}
						/>
						&nbsp;&nbsp;
					</label>
					<label>
						Do:
						<input id="chkDo" type="checkbox" />
						&nbsp;&nbsp;
					</label>
					<label>
						&nbsp;&nbsp;
						<button
							type="button"
							onClick={() => {
								let obj = {
									label: content, //document.getElementById("chkDo").value,
									done: false //document.getElementById("txtTask").value
								};
								setList(list.concat(obj));
								//setList(list.concat(getValues()));
								setContent("");
							}}>
							Add
						</button>
					</label>
				</div>

				{list &&
					list.map((item, index) => {
						return (
							<div
								key={index}
								className="list-group-item list-group-item-action">
								{item.label + "-" + item.done}
							</div>
						);
					})}

				<cite>{"* " + list.length + " items left"} </cite>
				<br />
				<div className="btn-group">
					<button
						onClick={() => {
							getToDo();
						}}
						type="button"
						className="btn btn-primary">
						Refresh
					</button>
					<button
						onClick={() => {
							saveToDo(list);
						}}
						className="btn btn-success"
						type="button">
						Update ToDo
					</button>
					<button
						type="button"
						className="btn btn-danger"
						onClick={() => {
							deleteToDo();
						}}>
						Clean ToDo
					</button>
				</div>
			</div>
		</>
	);
}
