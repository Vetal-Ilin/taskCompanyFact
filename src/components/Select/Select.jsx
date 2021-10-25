import React from 'react';
import { nanoid } from 'nanoid';

export default function Select({name, options = [], addSelectedPropertyState}) {

    let dataType = typeof options[0];

    const clickOptions = (event) => {
        addSelectedPropertyState({value: event.target.value, dataType: dataType})
    }

    return (
        <select className='select' onChange={clickOptions} defaultValue={'DEFAULT'}>
            <option value='DEFAULT' hidden>{dataType}</option>
            {options.map((item) => typeof item !== 'object' ? <option key={nanoid()}>{String(item)}</option> : <option key={nanoid()}>{JSON.stringify(item)}</option>)}
        </select>
    )
}