import React from 'react'

export default function CalculatedValues({className, calculatedValue, title}) {
    return (
        <div className={'calculated-values ' + className}>
            <p>{title}:</p>
            {calculatedValue && calculatedValue != '' ? <p>{calculatedValue}</p> : <p>Данные не выбраны</p>}
        </div>
    )
}
