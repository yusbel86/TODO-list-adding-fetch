import React, { useState, useEffect } from "react";

//create your first component
export function Home() {
	const [list, setList] = useState([]);
	const [content, setContent] = useState();

	function getToDo() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ipince")
			.then(resp => resp.json())
			.then(data => {
				setList(data);
				console.log("getToDo", data);
			});
	}

	function saveToDo(listToSave) {
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
			});
	}

	//for list todos
	useEffect(() => {
		getToDo();
	}, []);

	return (
		<>
			<div value={content} className="text-center pt-5 mt-5">
				<h1>todos</h1>
				<input value={content} placeholder=" add a task" />
				<button
					onClick={() => {
						setContent(content);
						saveToDo(setContent);
					}}
					className="btn btn-primary">
					add to do
				</button>

				{list &&
					list.map((item, index) => {
						return (
							<div
								key={index}
								className="list-group-item list-group-item-action">
								{item.label}
							</div>
						);
					})}
				<cite>{"* " + list.length + " items left"} </cite>
			</div>
		</>
	);
}
