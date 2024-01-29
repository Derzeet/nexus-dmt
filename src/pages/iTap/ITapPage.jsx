import { useState } from "react"

import Graph from "./Graph/Graph"
import LeftBar from "./leftBar/LeftBar"

import './itappage.scss'
import VisGraph from "./Graph/VisGraph"
import N4JDiagram from "./Graph/Diragram"

function ITapPage() {
    const [lbOpened, setLbOpened] = useState(true)
    
    const nodes = [
        { id: 1, name: 'Node 1', widthConstraint: { minimum: 200 },
        label: "1 This node has a mimimum width", color: 'red' },
        { id: 2, name: 'Nodasd', widthConstraint: { minimum: 120 },
        label: "2 This node has a mimimum width", color: 'red' },
        { id: 3, name: 'Node 1', widthConstraint: { minimum: 120 },
        label: "3 This node has a mimimum width", color: 'red' },
        { id: 4, name: 'Node 1', widthConstraint: { minimum: 120 },
        label: "4 This node has a mimimum width",color: 'red' },
        { id: 5, name: 'Node 2', widthConstraint: { minimum: 120 },
        label: "5 This node has a mimimum width", color: 'green' },
        { id: 6, name: 'Node 3', widthConstraint: { minimum: 120 },
        label: "6 This node has a mimimum width",color: 'yellow' }
    ];

    const links = [
        { source: 'node1', target: 'node2', color: 'black', label: 'DIRECTOR' },
        { source: 'node2', target: 'node3', color: 'black', label: 'DIRECTOR' },
        { source: 'node3', target: 'node1', color: 'black', label: 'DIRECTOR' },
        { source: 'node1', target: 'node8', color: 'black', label: 'DIRECTOR' },
        { source: 'node2', target: 'node11', color: 'black', label: 'DIRECTOR' },
        { source: 'node12', target: 'node1', color: 'black', label: 'DIRECTOR' }
    ];
    const linksVis = [
        { id: 11, from: 1, to: 2, color: 'black', label: 'DIRECTOR' },
        { id: 12,from: 1, to: 3, color: 'black', label: 'DIRECTOR' },
        { id: 13, from: 1, to: 4, color: 'black', label: 'DIRECTOR' },
        { id: 14 ,from: 3, to: 5, color: 'black', label: 'DIRECTOR' },
        { id: 15,from: 3, to: 6, color: 'black', label: 'DIRECTOR' },
        { id: 16,from: 6, to: 5, color: 'black', label: 'DIRECTOR' }
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
                    {/* <Graph nodes={nodes} links={links}/> */}
                    {/* <VisGraph nodes={nodes} edges={linksVis}/> */}
                    <N4JDiagram />
                </div>
            </div>
        </>
    )
}

export default ITapPage