import React from 'react';

export default function Lozenge(props) {
  const id = props.id;
  const name = props.name; 
  const removeDescendants = () => {props.removeDescendants(id)};

  return (
    <li id={id}>
      {name} <button onClick={removeDescendants}>  X  </button>
    </li>
  )
}