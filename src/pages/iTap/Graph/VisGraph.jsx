import { useEffect, useState } from "react";
import Graph from "react-vis-network-graph";


function VisGraph ({nodes, edges}) {
    const [nodesFG, setNodesFG] = useState([])
    var options = {
        edges: {
          font: {
            size: 12,
          },
          widthConstraint: {
            maximum: 90,
          },
        },
        nodes: {
          shape: "box",
          margin: 20,
          widthConstraint: {
            maximum: 300,
          },
        },
        layout: {
            // hierarchical: {
            //     // direction: 'UD',
            //     // sortMethod: 'directed', 
            // },
        },
        physics: {
          enabled: false,
        },
    };
    return (
        <Graph
            graph={{nodes: nodes, edges: edges}}
            options={options}
            className={"graph"}
        />
    )
}

export default VisGraph