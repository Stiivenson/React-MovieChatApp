import React, {useState} from 'react';

import MultiSelect from 'react-multi-select-component';

import './DropDownField.scss';

export interface IDropDownItem {
    label: string,
    value: string,
}

interface IDropDownFieldProps {
    onChange: (genresArray: string[]) => void,
    options: IDropDownItem[],
}

const DropDownField: React.VFC<IDropDownFieldProps> = ({options, onChange}) => {
    const [selected, setSelected] = useState<IDropDownItem[]>([]);
    return (
        <MultiSelect
            options={options}
            value={selected}
            onChange={(value: IDropDownItem[]) => {
                setSelected(value);
                onChange(value.map(genre => genre.value));
            }}
            hasSelectAll={false}
            labelledBy='Select'
        />
    )
}

export default DropDownField;