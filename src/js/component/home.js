import React, { useState, useEffect } from "react";

//create your first component
export function Home() {
	const [list, setList] = useState([]);
	const [content, setContent] = useState([]);
	const [check, setCheck] = useState(false);
	const [update, setUpdate] = useState("");
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
				//alert(data.result);
				setUpdate(data.result);
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
				console.log("newToDo", data);
				getToDo();
			});
	}
	useEffect(() => {
		getToDo();
	}, []);

	return (
		<>
			<div classNameName="container">
				<fieldset>
					<legend>ToDo List</legend>

					<div classNameName="form-group">
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
							<input
								id="chkDo"
								type="checkbox"
								checked={check}
								onChange={event => {
									setCheck(event.target.checked);
								}}
							/>
							&nbsp;&nbsp;
						</label>
						<label>
							&nbsp;&nbsp;
							<button
								type="button"
								onClick={() => {
									let obj = {
										label: content, //document.getElementById("chkDo").value,
										done: check //document.getElementById("txtTask").value
									};
									setList(list.concat(obj));
									//setList(list.concat(getValues()));
									setContent("");
									setCheck(false);
								}}>
								Add
							</button>
						</label>
					</div>
				</fieldset>
				{list &&
					list.map((item, index) => {
						return (
							<div
								key={index}
								classNameName="list-group-item list-group-item-action">
								{item.label + "-" + item.done}
							</div>
						);
					})}

				<cite>{"* " + list.length + " items left"} </cite>
				<br />
				<div classNameName="btn-group">
					<button
						onClick={() => {
							getToDo();
						}}
						type="button"
						classNameName="btn btn-primary">
						Refresh
					</button>
					<button
						onClick={() => {
							saveToDo(list);
						}}
						classNameName="btn btn-success"
						type="button"
						data-toggle="modal"
						data-target="#myModal">
						Update ToDo
					</button>
					<button
						type="button"
						classNameName="btn btn-danger"
						onClick={() => {
							deleteToDo();
						}}>
						Clean ToDo
					</button>
				</div>
			</div>

			{/* <!-- The Modal --> */}
			<div className="modal fade" id="myModal">
				<div className="modal-dialog">
					<div className="modal-content">
						{/* <!-- Modal Header --> */}
						<div className="modal-header">
							<h4 className="modal-title">ToDo Update</h4>
							<button
								type="button"
								className="close"
								data-dismiss="modal">
								×
							</button>
						</div>

						{/* <!-- Modal body --> */}
						<div className="modal-body">{update}</div>

						{/* <!-- Modal footer --> */}
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-danger"
								data-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
