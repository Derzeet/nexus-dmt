import { useState } from "react"

import Graph from "./Graph/Graph"
import LeftBar from "./leftBar/LeftBar"

import './itappage.scss'

function ITapPage() {
    const [lbOpened, setLbOpened] = useState(true)
    
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
                <div className="left-bar-container-button">
                    <div className={lbOpened ? "left-bar-container" : "left-bar-container closed"}>
                        <LeftBar/>
                    </div>
                    <div className="open-lb-button" onClick={() => {setLbOpened(!lbOpened)}}>
                        <svg className={lbOpened ? "default-svg closed wide" : "hidden-svg"} xmlns="http://www.w3.org/2000/svg" width="9" height="24" viewBox="0 0 9 24" fill="none">
                            <path d="M7 2L2.5 12L7 22" stroke="black" strokeWidth="4" strokeLinecap="round"/>
                        </svg>
                        <svg className={!lbOpened ? "default-svg closed wide" : "hidden-svg"} xmlns="http://www.w3.org/2000/svg" width="9" height="24" viewBox="0 0 9 24" fill="none">
                            <path d="M2 22L6.5 12L2 2" stroke="black" strokeWidth="4" strokeLinecap="round"/>
                        </svg>
                    </div>

                </div>
                <div className="graph-container">
                    <Graph nodes={nodes} links={links}/>
                </div>
            </div>
        </>
    )
}

export default ITapPage