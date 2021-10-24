import React from 'react';
import { nanoid } from 'nanoid';
import Select from '@components/Select/Select.jsx';

export default function ListSelect({className, arrayDataSelect = []}) {

    return (
        <div className={'list-select ' + className}>
            {arrayDataSelect.map((item) => <Select options={item} key={nanoid()} />)}
        </div>
    )
}
