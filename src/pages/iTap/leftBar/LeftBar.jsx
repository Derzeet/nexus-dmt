
import React, { useState } from 'react'
import './leftbar.scss'
import './spinner.scss'

import GenericInput from '../components/GenericInput/genericInput'
import CompactLogs from './compactLogs/CompactLogs'
import allRelations from '../../../data/Relations'

//icons
import regularIcon from '../images/refularIcon.svg'
import zagsIcon from '../images/zagsIcon.svg'
import historyIcon from '../images/searchIcon.svg'
import { setRef } from '@mui/material'

function LeftBar() {
    const [lbState, setLbState] = useState("regular")

    const [searchType, setSearchType] = useState('fl')

    const [fl_1_searchType, setFl_1_SearchType] = useState('iin')
    const [fl_2_searchType, setFl_2_SearchType] = useState('iin')
    const [object1, setObject1] = useState('')
    const [object2, setObject2] = useState('')

    //FIO formdata
    const [f1SearchType, setf1SearchType] = useState('starts')
    const [s1SearchType, sets1SearchType] = useState('starts')
    const [m1SearchType, setm1SearchType] = useState('starts')
    const [f2SearchType, setf2SearchType] = useState('starts')
    const [s2SearchType, sets2SearchType] = useState('starts')
    const [m2SearchType, setm2SearchType] = useState('starts')
    const [fname1, setFname1] = useState('')
    const [sname1, setSname1] = useState('')
    const [mfname1, setMname1] = useState('')
    const [fname2, setFname2] = useState('')
    const [sname2, setSname2] = useState('')
    const [mfname2, setMname2] = useState('')

    const [relations, setRelations] = useState([])

    //Graph
    const [limit, setLimit] = useState(20)
    const [depth, setDepth] = useState(1)

    const clearOptions = () => {
        setSearchType("fl")
        setFl_1_SearchType("iin")
        setFl_2_SearchType("iin")
        setObject1("")
        setObject2("")
        setf1SearchType("starts")
        sets1SearchType("starts")
        setm1SearchType("starts")
        setf2SearchType("starts")
        sets2SearchType("starts")
        setm2SearchType("starts")
        setFname1("")
        setSname1("")
        setMname1("")
        setFname2("")
        setSname2("")
        setMname2("")
        setDepth(1)
        setLimit(20)
    }



    return (
        <div className="left-bar">
            <div className='state-and-inputs'>
                <div className='state-changer'>
                    <div>
                        <button onClick={() => setLbState('regular')}className='regular'><img src={regularIcon}/><a>ОБЫЧНЫЙ</a></button>
                        <button className='zags'><img src={zagsIcon}/><a>ЗАГС</a></button>
                    </div>
                    <button onClick={() => setLbState('history')}><img src={historyIcon}/><a>ИСТОРИЯ</a></button>
                </div>
                {lbState == 'regular' ? 
                <div className="inputs">
                    <div className="base-search-type">
                        <label>Вид связи</label>
                        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                            <option value={"fl"}>ФЛ</option>
                            <option value={"ul"}>ЮЛ</option>
                            <option value={"flfl"}>ФЛ-ФЛ</option>
                            <option value={"flul"}>ФЛ-ЮЛ</option>
                            <option value={"ulul"}>ЮЛ-ЮЛ</option>
                        </select>
                    </div>
                    <h2>Первый объект</h2>
                    {['fl', 'flfl', 'flul'].includes(searchType) ? 
                        <GenericInput 
                            label="Поиск по ФЛ через" 
                            type="select" 
                            options={[
                                { label: 'ФИО', value: 'fio' },
                                { label: 'ИИН', value: 'iin' },
                            ]}
                            value={fl_1_searchType} 
                            onChange={setFl_1_SearchType} 
                        />
                        : null
                    }
                    {fl_1_searchType == 'iin' && ['fl', 'flfl', 'flul'].includes(searchType) ? 
                    <GenericInput 
                        label="Введите ИИН"
                        type="text" 
                        value={object1} 
                        onChange={setObject1} 
                    />
                    : fl_1_searchType == 'fio' && ['fl', 'flfl', 'flul'].includes(searchType) ? 
                        // First object is fl and type is fio
                        <div className="fio-container">

                            <div className='fio-wrapper'>
                                <label>Фамилия</label>
                                <div className="fio-type-selector">
                                    <div className="input-fixed">
                                        <GenericInput 
                                            // label="Введите ФИО"
                                            type="select" 
                                            options={[
                                                { label: 'Начинается', value: 'starts' },
                                                { label: 'Заканчивается', value: 'ends' },
                                                { label: 'Содержит', value: 'includes' },
                                            ]}
                                            value={s1SearchType}
                                            onChange={sets1SearchType} 
                                            />
                                    </div>
                                    <div className="input-flexible">
                                        <GenericInput 
                                            // label="Введите ФИО"
                                            type="text" 
                                            value={sname1} 
                                            onChange={setSname1} 
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className='fio-wrapper'>
                                <label>Имя</label>
                                <div className="fio-type-selector">
                                    <div className="input-fixed">
                                        <GenericInput 
                                            // label="Введите ФИО"
                                            type="select" 
                                            options={[
                                                { label: 'Начинается', value: 'starts' },
                                                { label: 'Заканчивается', value: 'ends' },
                                                { label: 'Содержит', value: 'includes' },
                                            ]}
                                            value={f1SearchType}
                                            onChange={setf1SearchType} 
                                            />
                                    </div>
                                    <div className="input-flexible">
                                        <GenericInput 
                                            // label="Введите ФИО"
                                            type="text" 
                                            value={fname1} 
                                            onChange={setFname1} 
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className='fio-wrapper'>
                                <label>Отчество</label>
                                <div className="fio-type-selector">
                                    <div className="input-fixed">
                                        <GenericInput 
                                            // label="Введите ФИО"
                                            type="select" 
                                            options={[
                                                { label: 'Начинается', value: 'starts' },
                                                { label: 'Заканчивается', value: 'ends' },
                                                { label: 'Содержит', value: 'includes' },
                                            ]}
                                            value={m1SearchType}
                                            onChange={setm1SearchType} 
                                            />
                                    </div>
                                    <div className="input-flexible">
                                        <GenericInput 
                                            // label="Введите ФИО"
                                            type="text" 
                                            value={mfname1} 
                                            onChange={setMname1} 
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>
                        : 
                        <GenericInput 
                            label="Введите БИН"
                            type="text" 
                            value={object1} 
                            onChange={setObject1} 
                        />
                    }
                    {['ulul', 'flfl', 'flul'].includes(searchType) &&
                        <h2>Второй объект</h2>
                    }
                    {searchType == 'flfl' ? 
                        <GenericInput 
                            label="Поиск по второму ФЛ через" 
                            type="select" 
                            options={[
                                { label: 'ФИО', value: 'fio' },
                                { label: 'ИИН', value: 'iin' },
                            ]}
                            value={fl_2_searchType} 
                            onChange={setFl_2_SearchType} 
                        />
                        : null
                    }
                    {fl_2_searchType == 'iin' && searchType == 'flfl' ? 
                        <GenericInput 
                            label="Введите ИИН"
                            type="text" 
                            value={object2} 
                            onChange={setObject2} 
                        />
                        : fl_2_searchType == 'fio' &&  searchType == 'flfl' ?
                        <div className="fio-container">

                            <div className='fio-wrapper'>
                                <label>Фамилия</label>
                                <div className="fio-type-selector">
                                    <div className="input-fixed">
                                        <GenericInput 
                                            // label="Введите ФИО"
                                            type="select" 
                                            options={[
                                                { label: 'Начинается', value: 'starts' },
                                                { label: 'Заканчивается', value: 'ends' },
                                                { label: 'Содержит', value: 'includes' },
                                            ]}
                                            value={s2SearchType}
                                            onChange={sets2SearchType} 
                                            />
                                    </div>
                                    <div className="input-flexible">
                                        <GenericInput 
                                            // label="Введите ФИО"
                                            type="text" 
                                            value={sname2} 
                                            onChange={setSname2} 
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className='fio-wrapper'>
                                <label>Имя</label>
                                <div className="fio-type-selector">
                                    <div className="input-fixed">
                                        <GenericInput 
                                            // label="Введите ФИО"
                                            type="select" 
                                            options={[
                                                { label: 'Начинается', value: 'starts' },
                                                { label: 'Заканчивается', value: 'ends' },
                                                { label: 'Содержит', value: 'includes' },
                                            ]}
                                            value={f2SearchType}
                                            onChange={setf2SearchType} 
                                            />
                                    </div>
                                    <div className="input-flexible">
                                        <GenericInput 
                                            // label="Введите ФИО"
                                            type="text" 
                                            value={fname2} 
                                            onChange={setFname2} 
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className='fio-wrapper'>
                                <label>Отчество</label>
                                <div className="fio-type-selector">
                                    <div className="input-fixed">
                                        <GenericInput 
                                            // label="Введите ФИО"
                                            type="select" 
                                            options={[
                                                { label: 'Начинается', value: 'starts' },
                                                { label: 'Заканчивается', value: 'ends' },
                                                { label: 'Содержит', value: 'includes' },
                                            ]}
                                            value={m2SearchType}
                                            onChange={setm2SearchType} 
                                            />
                                    </div>
                                    <div className="input-flexible">
                                        <GenericInput 
                                            // label="Введите ФИО"
                                            type="text" 
                                            value={mfname2} 
                                            onChange={setMname2} 
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>
                        : ['ulul', 'flul'].includes(searchType) ?
                        <GenericInput 
                            label="Введите БИН"
                            type="text" 
                            value={object2} 
                            onChange={setObject2} 
                        /> : null

                    }
                        <div className='graph-settings'>
                            <GenericInput 
                                label="Лимит" 
                                type="number" 
                                value={limit} 
                                onChange={setLimit} 
                                />
                            <GenericInput 
                                label="Уровень" 
                                type="number" 
                                value={depth} 
                                onChange={setDepth} 
                                />
                            <GenericInput 
                                label="Связи" 
                                type="chip-selecter" 
                                options={allRelations}
                                value={relations} 
                                onChange={setRelations} 
                            />
                        </div>
                </div>
                : lbState == 'history' ?
                <div className="inputs">
                    <CompactLogs />
                </div>
                : null
                }
            </div>
            <div className="submit-block">
                <a className='clear' onClick={clearOptions}>Очистить</a>
                <a className='submit'>Запустить</a>
            </div>
        </div>
    )
}

export default LeftBar