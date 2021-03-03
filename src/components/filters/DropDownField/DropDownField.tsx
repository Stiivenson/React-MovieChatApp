import React, {useState} from 'react';

import MultiSelect from 'react-multi-select-component';

import './DropDownField.scss';

export interface IDropDownItem {
    label: string,
    value: string,
}

interface IDropDownFieldProps {
    onChange?: (value: string) => void,
    options: IDropDownItem[],
}

const DropDownField: React.VFC<IDropDownFieldProps> = ({options, onChange}) => {

    const [selected, setSelected] = useState([]);

    return (
        <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy={'Select'}
        />
    )
}

export default DropDownField;