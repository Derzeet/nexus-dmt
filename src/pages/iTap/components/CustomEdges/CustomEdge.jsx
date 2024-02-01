import React from 'react';
import { useStore, getBezierPath,getMarkerEnd, EdgeText, MarkerType } from 'reactflow';

// Assuming getSpecialPath is defined here or imported

const getEdgeOffset = (source, target, edges, defaultOffset = 25) => {
  const samePairEdges = edges.filter(
    (e) => (e.source === source && e.target === target) || (e.source === target && e.target === source)
  );

  return samePairEdges.map((_, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    const magnitude = Math.ceil(index / 2) * defaultOffset;
    return direction * magnitude;
  });
};

const getSpecialPath = ({ sourceX, sourceY, targetX, targetY }, offset) => {
    // Calculate the midpoint for the control point
    const midX = (sourceX + targetX) / 2;
    const midY = (sourceY + targetY) / 2;

    // Adjust the control point's y-coordinate by the offset
    const controlX = midX;
    const controlY = midY + offset;

    // Generate the SVG path command for a quadratic bezier curve
    const path = `M${sourceX},${sourceY} Q${controlX},${controlY} ${targetX},${targetY}`;

    return path;
};

const CustomEdge = ({ id, source, label, target, sourceX, sourceY, targetX, targetY, style, data, arrowHeadType }) => {
  const edges = useStore((store) => store.edges);
  const offsets = getEdgeOffset(source, target, edges);
  const edgeIndex = edges.findIndex((e) => e.id === id);
  const offset = offsets[edgeIndex] || 0;

  const path = getSpecialPath({ sourceX, sourceY, targetX, targetY }, offset);
  const markerEnd = getMarkerEnd(arrowHeadType, MarkerType.ArrowClosed);

  return (
    <>
      <path id={id} style={style} className="react-flow__edge-path" d={path} markerEnd={markerEnd} />
      {/* Assuming you want to include a label or other elements */}
      <EdgeText
        x={(sourceX + targetX) / 2}
        y={(sourceY + targetY) / 2 + offset}
        label={label}
        labelStyle={data.labelStyle}
        labelShowBg={data.labelShowBg}
        labelBgStyle={data.labelBgStyle}
        labelBgPadding={data.labelBgPadding}
        labelBgBorderRadius={data.labelBgBorderRadius}
      />
    </>
  );
};

export default CustomEdge;
