
import React, { useState } from 'react'
import './leftbar.scss'
import GenericInput from '../iTap/components/GenericInput/genericInput'


function LeftBar() {
    const [searchType, setSearchType] = useState('fl')

    const [fl_1_searchType, setFl_1_SearchType] = useState('iin')
    const [fl_2_searchType, setFl_2_SearchType] = useState('iin')
    const [object1, setObject1] = useState('')


    return (
        <div className="left-bar">
            <div className="inputs">
                <GenericInput 
                    label="Вид связи" 
                    type="select" 
                    options={[
                        { label: 'ФЛ', value: 'fl' },
                        { label: 'ЮЛ', value: 'ul' },
                        { label: 'ФЛ-ФЛ', value: 'flfl' },
                        { label: 'ФЛ-ЮЛ', value: 'flul' },
                        { label: 'ЮЛ-ЮЛ', value: 'ulul' },
                    ]}
                    value={searchType} 
                    onChange={setSearchType} 
                />
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
                    <GenericInput 
                        label="Введите ФИО"
                        type="text" 
                        value={object1} 
                        onChange={setObject1} 
                    /> 
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
                        value={object1} 
                        onChange={setObject1} 
                    />
                    : fl_2_searchType == 'fio' &&  searchType == 'flfl' ?
                    <GenericInput 
                        label="Введите ФИО"
                        type="text" 
                        value={object1} 
                        onChange={setObject1} 

                    />
                    : ['ulul', 'flfl', 'flul'].includes(searchType) ?
                    <GenericInput 
                        label="Введите БИН"
                        type="text" 
                        value={object1} 
                        onChange={setObject1} 

                    /> : null

                }

            </div>
        </div>
    )
}

export default LeftBar