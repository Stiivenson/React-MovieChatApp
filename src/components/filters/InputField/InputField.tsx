import React, {useState} from 'react';

import './InputField.scss';

interface IInputFieldProps {
    onChange: (value: string) => void
}

const InputField: React.VFC<IInputFieldProps> = (props) => {

    const [inputValue, setInputValue] = useState('');

    return (
        <input
            className='InputField'
            type='text'
            placeholder='Search a film...'
            value={inputValue}
            onChange={(event => {
                const value = event.target.value;
                setInputValue(value);
                props.onChange(value.toLowerCase());
            })}
        />
    )
}

export default InputField;