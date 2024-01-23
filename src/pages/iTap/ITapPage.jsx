import Graph from "./Graph/Graph"
import LeftBar from "../leftBar/LeftBar"

import './itappage.scss'

function ITapPage() {
    const nodes = [
        { id: 'node1', name: 'Node 1', color: 'red' },
        { id: 'node2', name: 'Nodasd', color: 'red' },
        { id: 'node3', name: 'Node 1', color: 'red' },
        { id: 'node8', name: 'Node 1', color: 'red' },
        { id: 'node12', name: 'Node 2', color: 'green' },
        { id: 'node11', name: 'Node 3', color: 'blue' }
    ];

    const links = [
        { source: 'node1', target: 'node2', color: 'black', label: 'DIRECTOR' },
        { source: 'node2', target: 'node3', color: 'black', label: 'DIRECTOR' },
        { source: 'node3', target: 'node1', color: 'black', label: 'DIRECTOR' },
        { source: 'node1', target: 'node8', color: 'black', label: 'DIRECTOR' },
        { source: 'node2', target: 'node11', color: 'black', label: 'DIRECTOR' },
        { source: 'node12', target: 'node1', color: 'black', label: 'DIRECTOR' }
    ];
    return (
        <>
            <div className="itap-tool-wraper">
                <div className="left-bar">
                    <LeftBar/>
                </div>
                <div className="graph-container">
                    <Graph nodes={nodes} links={links}/>
                </div>
            </div>
        </>
    )
}

export default ITapPage