import React, { useState } from 'react';
import { EdgeText, getBezierPath } from 'react-flow-renderer';

const EditableEdge = ({ edge, sourceX, sourceY, targetX, targetY, style = {} }) => {
  const path = getBezierPath({ sourceX, sourceY, targetX, targetY });
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    setEditing(true);

    // Perform actions when the edge is clicked (e.g., open a modal)
    // For demonstration purposes, let's log the edge data
    console.log('Edge Clicked:', edge);

    // You can implement your modal logic here
    // For example, opening a modal with the edge data
    // showModal(edge);
  };

  return (
    <>
      <path
        style={{ fill: 'none', stroke: editing ? 'red' : '#888', strokeWidth: 2, ...style }}
        d={path}
        onClick={handleClick}
      />
      <EdgeText x={path[1]} y={path[2]} label={edge.data.label} style={{ fill: 'black' }} />
    </>
  );
};

export default EditableEdge;