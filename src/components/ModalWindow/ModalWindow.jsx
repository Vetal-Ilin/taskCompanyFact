import React from 'react';
import iconError from '@images/iconError.svg';

export default function ModalWindow(props) {
    return (
        <article className={'modal-window ' + props.className}>
            <div className='modal-window__wrapper'>
                <div className='modal-window__wrapper__card'>
                    <div className='modal-window__wrapper__card__header'>
                        <img src={iconError} alt='Ошибка' />
                        <h1>Возникла ошибка</h1> 
                    </div>
                    <div className='modal-window__wrapper__card__message'>
                        <p>Не удалось получить данные с сервера</p>
                    </div>
                    <div className='modal-window__wrapper__card__footer'>
                        <button><p>ОК</p></button>
                    </div>
                </div>
            </div>
        </article>
    )
}
