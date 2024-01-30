import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

import plusIcon from '../../images/plucIcon.svg'
import trashIcon from '../../images/trashIcon.svg'
import editIcon from '../../images/editIcon.svg'


import './quadricNode.scss'

function CompanyNode({ id, data }) {
    const [keys, setKeys] = useState(Object.keys(data))
    const [visibleKeys, setVisibleKeys] = useState(['IINBIN'])


    const handlePropertyChange = (x) => {
        setVisibleKeys(prevKeys => {
            if (prevKeys.includes(x)) {
                // Remove x from the array
                return prevKeys.filter(y => y !== x);
            } else {
                // Add x to the array
                return [...prevKeys, x];
            }
        });
    }

    return (
        <div className='quadric-node' style={{backgroundColor: "#0A84C3"}}>
            <Handle
                type="target"
                position={Position.Top}
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <div className="node-header">
                {data.Name}
            </div>
            <div className="node-body">
                {visibleKeys.map(x => {
                    return (
                        <a>{x}: {data[x]}</a>
                    )
                })}
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={{ background: '#555' }}
            />
            <div className='node-tools-bar'>
                {/* <img src={editIcon} alt='edit'/>
                <img src={plusIcon} alt='add'/>
                <img src={trashIcon} alt='delete'/> */}
                <div className='edit-node-properties'>
                    <h1>Показать поля</h1>
                    <div className="list-of-properties">
                        {keys.map(x => {
                            return (
                                <div className='prop-vision'>
                                    <input type="checkbox" onChange={() => handlePropertyChange(x)} name="" id="" checked={visibleKeys.includes(x)} />
                                    <a>{x}</a>
                                </div>
                            )
                        })}

                    </div>
                    <div className='edit-node-footer'>
                        <img src={plusIcon} alt="+" />
                        <a>Добавить текст</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(CompanyNode);