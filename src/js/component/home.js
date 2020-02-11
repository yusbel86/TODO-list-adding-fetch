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
				<button
					onClick={() => {
						setList(list.concat(content));
						setContent("");
					}}>
					add to do
				</button>
				<input
					value={content}
					onChange={e => setContent(e.target.value)}
					onKeyPress={e => {
						if (e.key === "Enter") {
							setList(list.concat(content));
							setContent("");
						}
					}}
				/>

				{list.map((item, index) => {
					return <div key={index}>{item}</div>;
				})}
			</div>
			<hr />

			<div className="text-center pt-5 mt-5">
				<p>you clicked {count} times</p>
				<button
					onClick={() => {
						setCount(count + 1);
					}}>
					Click
				</button>
			</div>
		</>
	);
}
