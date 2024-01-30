import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

import plusIcon from '../../images/plucIcon.svg'
import trashIcon from '../../images/trashIcon.svg'
import editIcon from '../../images/editIcon.svg'


import './quadricNode.scss'
import { hover } from '@testing-library/user-event/dist/hover';

function CompanyNode({ id, data }) {
    const [keys, setKeys] = useState(Object.keys(data))
    const [visibleKeys, setVisibleKeys] = useState(['IINBIN'])

    const [hoverState, setHoverState] = useState('')


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
                {hoverState == '' ? 
                    <>
                        <img src={editIcon} alt='edit' onClick={() => setHoverState('edit')}/>
                        <img src={plusIcon} alt='add'  onClick={() => setHoverState('add')}/>
                        <img src={trashIcon} alt='delete'/>
                    </>
                    :
                    hoverState == 'edit' ? 
                    <div className='edit-node-properties' onMouseLeave={() => setHoverState('')}>
                        <h1>Показать поля</h1>
                        <div 
                            className="list-of-properties" 
                            
                            >
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
                    : hoverState == 'add' ? 
                    <div className='edit-node-properties' onMouseLeave={() => setHoverState('')}>
                        
                    </div>
                    : null
                }
            </div>
        </div>
    );
}

export default memo(CompanyNode);