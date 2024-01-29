export default function assignGridPositions(nodes, gridWidth, gridHeight, startX, startY) {
    let posX = startX;
    let posY = startY;
    const gapX = gridWidth; // Horizontal gap between nodes
    const gapY = gridHeight; // Vertical gap between nodes
    const numCols = Math.ceil(Math.sqrt(nodes.length)); // Number of columns in the grid

    nodes.forEach((node, index) => {
        node.position = { x: posX, y: posY };

        if ((index + 1) % numCols === 0) {
            posX = startX;  // Reset X position
            posY += gapY;   // Move down a row
        } else {
            posX += gapX;   // Move to the right
        }
    });

    return nodes;
}