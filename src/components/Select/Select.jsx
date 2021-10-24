import React from 'react';
import { nanoid } from 'nanoid';

export default function Select({name, options = [], addSelectedPropertyState}) {

    const clickOptions = (event) => {
        addSelectedPropertyState(event.target.value)
    }

    return (
        <select name={name} className='select' onChange={clickOptions} defaultValue={'DEFAULT'}>
            <option value='DEFAULT' hidden>{typeof options[0]}</option>
            {options.map((item) => typeof item !== 'object' ? <option key={nanoid()}>{String(item)}</option> : <option key={nanoid()}>{JSON.stringify(item)}</option>)}
        </select>
    )
}