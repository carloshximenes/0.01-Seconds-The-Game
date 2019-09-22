import React from 'react';

export default function ScoreBoard(props) {
    return (<div>Goal: {props.goal} | Result: {props.result} | Points: {props.points}/{props.total} </div>);
}