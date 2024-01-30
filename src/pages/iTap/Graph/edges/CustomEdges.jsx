import React from 'react';
import { EdgeText, getBezierPath } from 'react-flow-renderer';

const CustomEdge = ({ edge, sourceX, sourceY, targetX, targetY, style = {} }) => {
  const path = getBezierPath({ sourceX, sourceY, targetX, targetY });
  const labelX = path[1]; 
  const labelY = path[2]; 

  return (
    <>
      <path
        style={{ fill: 'none', stroke: '#888', strokeWidth: 2, ...style }}
        d={path}
      />

      <EdgeText x={labelX} y={labelY} label={edge.data.label} style={{ fill: 'red' }} />
    </>
  );
};

export default CustomEdge;
