import { useState } from 'react';

import './genericInput.scss'


function GenericInput({ label, type, options, value, onChange }) {
    const [selectedChips, setSelectedChips] = useState([]);

    const [displayedChips, setDisplayedChips] = useState([])


    const toggleChip = (chip) => {
        setSelectedChips(prev =>
            prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
        );
    };

    const handleInputForChip = (e) => {
        const chips = e.split(',')
    }

    const chooseAll = () => {
        options.map(x => {
            toggleChip(x.value)
        })

        if (selectedChips.length == options.length) {
            setSelectedChips([])
        } else {
            setSelectedChips(options.map( x => x.value))
        }
    }

    const renderInput = () => {
        switch (type) {
            case 'text':
                return <input type="text" placeholder={label} value={value} onChange={e => onChange(e.target.value)} />;
            case 'number':
                return <input type="number" value={value} onChange={e => onChange(e.target.value)} />;
            case 'select':
                return (
                    <select value={value} onChange={e => onChange(e.target.value)}>
                        {options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            case 'chip-selecter':
                return (
                    <>
                        <button className='choose-all' onClick={chooseAll}><a>Выбрать все</a></button>
                        {/* <input type='text' value={selectedChips.map(x => options.find(s => s.value == x).name).join(',')} onChange={(e) => handleInputForChip(e.target.value)}/> */}
                        <div className="chip-container">

                            {displayedChips == 0 ? options.map(chip => (
                                <div
                                key={chip.value}
                                className={`chip ${selectedChips.includes(chip.value) ? 'selected' : ''}`}
                                onClick={() => toggleChip(chip.value)}
                                >
                                    {chip.name}
                                </div>
                            )) : 
                            displayedChips.map(chip => (
                                <div
                                key={chip.value}
                                className={`chip ${selectedChips.includes(chip.value) ? 'selected' : ''}`}
                                onClick={() => toggleChip(chip.value)}
                                >
                                    {chip.name}
                                </div>
                            ))
                            }
                        </div>
                    </>
                
                )
            default:
                return null;
        }
    };

    return (
        <div className="one-line-input">
            {label ? 
            <label>{label}</label>
            : null
            }
            {renderInput()}
        </div>
    );
}

export default GenericInput