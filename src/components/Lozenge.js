import React from 'react';
import { zoomToBounds } from '../zoom';

export default function Lozenge(props) {
  const id = props.id;
  const name = props.name;
  const groupGridBounds = props.groupGridBounds;
  const childrenBounds = props.childrenBounds;
  const removeDescendants = () => {
    zoomToBounds(groupGridBounds);
    props.removeDescendants(id);
  };
  const zoomTo = () => {
    zoomToBounds(childrenBounds);
  }

  return (
    <li id={id}>
      <button onClick={zoomTo}>{name}</button> <button onClick={removeDescendants}>  X  </button>
    </li>
  )
}