import React from 'react'

export default function CalculatedValues({className, selectedMultipliedPropertiesNumbers, title}) {
    return (
        <div className={'calculated-values ' + className}>
            <p>{title}:</p>
            {selectedMultipliedPropertiesNumbers ? <p>{selectedMultipliedPropertiesNumbers}</p> : <p>Данные не выбраны</p>}
        </div>
    )
}
