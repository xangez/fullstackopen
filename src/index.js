import React, {useState} from "react";
import ReactDOM from "react-dom";

const Button = ({handleClick, text}) => {
	return <button onClick={handleClick}>{text}</button>;
};

const Statistic = ({text, value}) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};

const Statistics = ({good, neutral, bad}) => {
	let all = good + bad + neutral;
	let average = (good + bad * -1) / all;
	let positive = good / all * 100;

	if (all === 0) {
		return <p>No feedback given</p>;
	}
	return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={average} />
        <Statistic text="postive" value={positive} />
      </tbody>
    </table>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<>
			<h1>Give Feedback</h1>
			<Button handleClick={() => setGood(good + 1)} text="Good" />
			<Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
			<Button handleClick={() => setBad(bad + 1)} text="Bad" />
			<h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
		</>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
