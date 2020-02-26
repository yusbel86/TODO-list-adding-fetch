import React, { useState, useEffect } from "react";

//create your first component
export function Home() {
	const [list, setList] = useState([]);
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/YUSBEL")
			.then(Response => Response.json())
			.then(data => {
				setList(data);
			});
	}, []);

	return (
		<div className="text-center">
			{list.map((item, index) => {
				return <div key={index}>{item.label}</div>;
			})}
		</div>
	);
}
