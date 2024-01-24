import './genericInput.scss'


function GenericInput({ label, type, options, value, onChange }) {
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