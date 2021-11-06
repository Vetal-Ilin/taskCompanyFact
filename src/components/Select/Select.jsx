import React from 'react';
import { nanoid } from 'nanoid';

export default function Select({options = [], addSelectedPropertyState}) {

    let valueType = typeof options[0];

    const clickOptions = (event) => {
        addSelectedPropertyState({value: event.target.value, valueType: valueType})
    }

    return (
        <select className='select' onChange={clickOptions} defaultValue={'DEFAULT'}>
            <option value='DEFAULT' hidden id='select-first-option-id'>{valueType}</option>
            {options.map((item) => typeof item !== 'object' ? <option key={nanoid()}>{String(item)}</option> : <option key={nanoid()}>{JSON.stringify(item)}</option>)}
        </select>
    )
}