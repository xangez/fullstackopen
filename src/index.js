import React, {useState} from "react";
import ReactDOM from "react-dom";

const anecdotes = [
	"If it hurts, do it more often",
	"Adding manpower to a late software project makes it later!",
	"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
	"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
	"Premature optimization is the root of all evil.",
	"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

// const Header = () => {

// }

const Button = ({handleClick, text}) => {
	return <button onClick={handleClick}>{text}</button>;
};

const Anecdote = ({anecdote, votes}) => {
	return (
		<p>
			{anecdote} has: {votes} votes
		</p>
	);
};

const App = ({anecdotes}) => {
	const [selected, setSelected] = useState(0);

	const initialVotes = Array(anecdotes.length).fill(0);
	const [votes, setVotes] = useState(initialVotes);

	const getRandom = () => {
		let newIndex = Math.floor(Math.random() * anecdotes.length);
		setSelected(newIndex);
	};

	const addVote = () => {
		const copy = [...votes];
		copy[selected]++;
		setVotes(copy);
	};

	const maxVotes = Math.max(...votes);
	const mostVoted = anecdotes[votes.indexOf(maxVotes)];

	return (
		<div>
			<h1>Anecdote of the Day</h1>
			<Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
			<Button handleClick={addVote} text={"vote"} />
			<Button handleClick={getRandom} text={"Next Anecdote"} />
			<h1>Anecdote with most votes</h1>
			<Anecdote anecdote={mostVoted} votes={maxVotes} />
		</div>
	);
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
