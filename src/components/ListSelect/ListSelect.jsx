import React from 'react';
import { nanoid } from 'nanoid';
import Select from '@components/Select/Select.jsx';

export default function ListSelect({className, arrayDataSelect = []}) {

    return (
        <div className={'list-select ' + className}>
            <h2>Выберите значения</h2>
            <div className='list-select__wrapper'>
                {arrayDataSelect.map((item) => <Select options={item} key={nanoid()} />)}
            </div>
        </div>
    )
}
