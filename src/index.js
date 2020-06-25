import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = ({ good, neutral, bad }) => {
	let all = good + bad + neutral;
	let average = (good + bad * -1) / all;
	let positive = good / all * 100;

	return (
		<div>
			<h1>Statistics</h1>
			<p>good {good}</p>
			<p>neutral {neutral}</p>
			<p>bad {bad}</p>
			<p>all {all}</p>
			<p>average {average}</p>
			<p>positive {positive}%</p>
		</div>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	return (
		<div>
			<h1>Give Feedback</h1>
			<button onClick={() => setGood(good + 1)}>good</button>
			<button onClick={() => setNeutral(neutral + 1)}>neutral</button>
			<button onClick={() => setBad(bad + 1)}>bad</button>
			<Statistics good={good} bad={bad} neutral={neutral} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
