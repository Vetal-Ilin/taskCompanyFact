import React from 'react';
import { nanoid } from 'nanoid';

export default function Select({name, options = []}) {
    return (
        <select name={name} className='select'>
            {options.map((item) => typeof item !== 'object' ? <option key={nanoid()}>{String(item)}</option> : <option key={nanoid()}>{JSON.stringify(item)}</option>)}
        </select>
    )
}