// export default function assignGridPositions(nodes, gridWidth, gridHeight, startX, startY) {
//     let posX = startX;
//     let posY = startY;
//     const gapX = gridWidth; // Horizontal gap between nodes
//     const gapY = gridHeight; // Vertical gap between nodes
//     const numCols = Math.ceil(Math.sqrt(nodes.length)); // Number of columns in the grid

//     nodes.forEach((node, index) => {
//         node.position = { x: posX, y: posY };

//         if ((index + 1) % numCols === 0) {
//             posX = startX;  // Reset X position
//             posY += gapY;   // Move down a row
//         } else {
//             posX += gapX;   // Move to the right
//         }
//     });

//     return nodes;
// }

export default function assignGridPositions(nodes, keyNodeId, startX, startY, gapX, gapY) {
    const keyNode = nodes.find(node => node.id === keyNodeId.toString());
    // Assuming 'quadric' nodes are directly related and others need special handling
    const directlyRelatedNodes = nodes.filter(node => node.id !== keyNodeId.toString() && node.type === 'quadric');
    const otherNodes = nodes.filter(node => node.id !== keyNodeId.toString() && node.type !== 'quadric');

    // Position the key node
    if (keyNode) {
        keyNode.position = { x: startX, y: startY + (gapY * nodes.length / 4) };
    }

    // Position directly related nodes on the right
    let currentY = startY;
    directlyRelatedNodes.forEach(node => {
        node.position = { x: startX + gapX * 2, y: currentY }; // Double the gapX for the right column
        currentY += gapY; // Move down for the next node
    });

    // Position other nodes in the intermediate column
    // Reset currentY for other nodes, you may choose to offset it to separate from directly related nodes
    currentY = startY + (gapY / 2); // Optional: Start a bit lower to visually distinguish groups
    otherNodes.forEach((node, index) => {
        node.position = { x: startX + gapX, y: currentY }; // Intermediate column
        currentY += gapY; // Move down for the next node
    });

    return nodes;
}
