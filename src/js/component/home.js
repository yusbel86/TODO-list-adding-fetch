import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [list, setList] = useState([]);
	const [content, setContent] = useState();

	const [count, setCount] = useState(0);
	return (
		<>
			<div className="text-center pt-5 mt-5">
				<h1>todos</h1>
				<input
					key={"txt1"}
					value={content}
					onChange={e => setContent(e.target.value.toUpperCase())}
					onKeyPress={e => {
						if (e.key === "Enter") {
							if (content !== "") {
								setList(list.concat(content.toUpperCase()));
								setContent("");
							} else {
								alert("input one text,please!");
							}
						}
					}}
				/>
				<button
					onClick={() => {
						if (content !== "") {
							setList(list.concat(content.toUpperCase()));
							setContent("");
						} else {
							alert("input one text,please!");
						}
					}}>
					add to do
				</button>
				{list.map((item, index) => {
					return (
						<div
							key={index}
							onClick={() =>
								setList(
									list.filter(
										(itemf, indexf) => indexf !== index
									)
								)
							}
							className="list-group-item list-group-item-action">
							{item}
						</div>
					);
				})}
				<br />
				<cite>{"* " + list.length + " items left"} </cite>
			</div>
		</>
	);
}

/*
    window.onload = function() {
	document.getElementById("#txt1").focus();
};
*/
