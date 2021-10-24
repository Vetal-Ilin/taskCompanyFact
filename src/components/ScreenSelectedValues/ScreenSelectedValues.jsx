import React from 'react'
import waitImage from '@images/waitImage.png'

export default function ScreenSelectedValues({className, selectedListProperties = []}) {

    let iterateSelectedProperties = function() {return selectedListProperties.map((item) => <p>{item}</p>)}

    return (
        <article className={'screen-selected-values ' + className}>
            <h2>Выбранные значения</h2>
            <div className='screen-selected-values__text'>
                {selectedListProperties.length !== 0 ? iterateSelectedProperties() : <div className='screen-selected-values__text__primary'><img src={waitImage} alt='Ожидание' /><p>Данные не выбраны</p></div>}
            </div>
        </article>
    )
}
