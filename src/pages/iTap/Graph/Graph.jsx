import React, {useState, useEffect, useCallback, useRef} from 'react';
import { ForceGraph2D } from 'react-force-graph';

function Graph({nodes, links}) {
    const highlightNodes = useRef(new Set());
    const highlightLinks = useRef(new Set());

    const [graphData, setGraphData] = useState({ nodes, links });
    const [simulationEnabled, setSimulationEnabled] = useState(true);
    const rectWidth = 80; // Rectangle width
    const rectHeight = 20; // Rectangle height
    
    useEffect(() => {
        // Freeze all nodes positions
        const updatedNodes = graphData.nodes.map(node => ({
            ...node,
            fx: node.x,
            fy: node.y,
            fz: node.z
        }));

        setGraphData({ nodes: updatedNodes, links: graphData.links });
    }, []); // Run only once after the first render

    const handleNodeDragStart = node => {
        // Unfreeze the node being dragged
        node.fx = null;
        node.fy = null;
        node.fz = null;
    };

    const handleNodeDragEnd = node => {
        // Freeze the node once dragging ends
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
    };

    const handleNodeHover = useCallback(node => {
        highlightNodes.current.clear();
        highlightLinks.current.clear();

        if (node) {
            highlightNodes.current.add(node);
            links.forEach(link => {
                if (link.source === node.id || link.target === node.id) {
                    highlightLinks.current.add(link);
                }
            });
        }

        // Trigger update here if needed
    }, [links]);

    const handleLinkHover = useCallback(link => {
        highlightNodes.current.clear();
        highlightLinks.current.clear();

        if (link) {
            highlightLinks.current.add(link);
            highlightNodes.current.add(link.source);
            highlightNodes.current.add(link.target);
        }

        // Trigger update here if needed
    }, []);


    return (
        <ForceGraph2D
            graphData={graphData}
            onNodeDragStart={handleNodeDragStart}
            onNodeDragEnd={handleNodeDragEnd}            
            nodeAutoColorBy="color"
            backgroundColor="white"
            linkWidth={2} // Makes links more visible
            nodeLabel="name"
          
            linkCurvature={0}
            nodeCanvasObject={(node, ctx, globalScale) => {
                const fontSize = 10;
                ctx.font = `${fontSize}px Sans-Serif`;
                const padding = 10;

                // Prepare text lines from node properties
                const lines = [
                    `Name: ${node.name}`,
                    `ID: ${node.id}`,
                    // Add other properties here, e.g., `ID: ${node.id}`
                    // You can iterate over properties if they are in a predictable format
                ];
                const lineHeight = fontSize * 1.2; // Line height
                const textHeight = lineHeight * lines.length;
                const rectWidth = Math.max(...lines.map(line => ctx.measureText(line).width)) + padding * 2;
                const rectHeight = textHeight + padding * 2;

                const color = highlightNodes.current.has(node) ? 'orange' : node.color;

                // Function to draw rounded rectangle
                const drawRoundedRect = (x, y, width, height, radius) => {
                    ctx.beginPath();
                    ctx.moveTo(x + radius, y);
                    ctx.lineTo(x + width - radius, y);
                    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                    ctx.lineTo(x + width, y + height - radius);
                    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                    ctx.lineTo(x + radius, y + height);
                    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                    ctx.lineTo(x, y + radius);
                    ctx.quadraticCurveTo(x, y, x + radius, y);
                    ctx.closePath();
                };
            
                ctx.fillStyle = color;
                drawRoundedRect(node.x - rectWidth / 2, node.y - rectHeight / 2, rectWidth, rectHeight, 5); // 5 is borderRadius
                ctx.fill();
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
                drawRoundedRect(node.x - rectWidth / 2, node.y - rectHeight / 2, rectWidth, rectHeight, 5);
                ctx.stroke();

                // Draw the text lines
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';
                ctx.fillStyle = 'black';
                const textStartX = node.x - rectWidth / 2 + padding; // Adjust x to start from the left side of the rectangle

                lines.forEach((line, i) => {
                    const textY = node.y - textHeight / 2 + lineHeight * (i + 0.5) + padding / 2;
                    ctx.fillText(line, textStartX, textY); // Use textStartX for the x-coordinate
                });
            }}
            
            linkCanvasObject={(link, ctx, globalScale) => {
                const start = link.source;
                const end = link.target;
            
                // Draw line for the link
                ctx.beginPath();
                ctx.moveTo(start.x, start.y);
                ctx.lineTo(end.x, end.y);
                ctx.strokeStyle = highlightLinks.current.has(link) ? 'red' : 'black'; // Default color if not specified
                ctx.lineWidth = globalScale > 1 ? 1 / globalScale : 1; // Adjust line width for zoom
                ctx.stroke();
            
                // Calculate the middle point for the label
                const middleX = (start.x + end.x) / 2;
                const middleY = (start.y + end.y) / 2;
            
                // Calculate the angle of the line (in radians)
                const angle = Math.atan2(end.y - start.y, end.x - start.x);
            
                // Set label color
                const labelColor = highlightLinks.current.has(link) ? 'red' : 'black';
            
                // Save the current context, then rotate and draw the label
                ctx.save();
                ctx.translate(middleX, middleY);
                ctx.rotate(angle);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.font = `4px Sans-Serif`;
                ctx.fillStyle = labelColor;
                ctx.fillText(link.label, 0, 0);
                ctx.restore();
            }}
            
            onNodeHover={handleNodeHover}
            onLinkHover={handleLinkHover}
            nodePointerAreaPaint={(node, color, ctx) => {
                // Define the pointer area as a rectangle
                ctx.beginPath();
                ctx.rect(node.x - rectWidth / 2, node.y - rectHeight / 2, rectWidth, rectHeight);
                ctx.fillStyle = color; // Invisible but catchable area
                ctx.fill();
            }}
            
        />
    );
}

export default Graph;
