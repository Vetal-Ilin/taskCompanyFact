import React, {useState, useEffect} from 'react';
import loadJson from '../services/loadJson/loadJson.service';
import customFlatArrMethod from '../services/customFlatArrMethod/customFlatArrMethod.service';
import customSplitArrMethod from '../services/customSplitArrMethod/customSplitArrMethod.service';
import ModalWindow from '@components/ModalWindow/ModalWindow.jsx';
import ListSelect from '@components/ListSelect/ListSelect';
import ScreenSelectedValues from '@components/ScreenSelectedValues/ScreenSelectedValues';
import CalculatedValues from '@components/CalculatedValues/CalculatedValues';
import {sha256} from 'js-sha256'; 


export default function App() {
    const [showModalWindowError, setShowModalWindowError] = useState(false);
    const [arrayDataSelect, setArrayDataSelect] = useState([]);
    const [selectedListProperties, setSelectedListProperties] = useState([]);
    const [selectedListDeletedProperties, setSelectedListDeletedProperties] = useState([]);
    const [selectedMultipliedPropertiesNumbers, setSelectedMultipliedPropertiesNumbers] = useState([]);
    const [selectedHashPropertiesString, setSelectedhashPropertiesString] = useState([]);


    const closeModalWindowError = () => {
        setShowModalWindowError(false)
    }


    const addSelectedPropertyState = ({value, valueType}) => {
        setSelectedListDeletedProperties([]);
        if(selectedListProperties.length < 10) {
            setSelectedListProperties((prev) => [...prev, [value, valueType]])
        } else {
            let notFirstSelectedElementArray = selectedListProperties.filter((item, index) => index != 0);
            setSelectedListProperties(notFirstSelectedElementArray.concat([[value, valueType]]))
        }
    }
    

    const transformationsSelectedValues = () => {
        if(selectedListProperties.length !== 0) {
            let mul = 1;
            let number = 0;
            let stringConcat = '';
            let string = 0;
            for (let i = 0; i < selectedListProperties.length; ++i) {
                if(selectedListProperties[i][1] === 'number') {
                    mul *= selectedListProperties[i][0];
                    number +=1
                }
                if(selectedListProperties[i][1] === 'string') {
                    stringConcat += selectedListProperties[i][0];
                    string += 1
                }
            }
            if(number !== 0) {
                setSelectedMultipliedPropertiesNumbers(mul)
            } else {
                setSelectedMultipliedPropertiesNumbers([])
            }
            if(string !== 0) {
                let hashstringConcat = sha256(stringConcat);
                setSelectedhashPropertiesString(hashstringConcat)
            } else {
                setSelectedhashPropertiesString('')
            }
        } else if(selectedListProperties.length === 0) {
            setSelectedMultipliedPropertiesNumbers([]);
            setSelectedhashPropertiesString([])
        }
    }


    const onClickButtonReset = () => {
        setSelectedListProperties([]);
        setSelectedMultipliedPropertiesNumbers([]);
        setSelectedhashPropertiesString([]);
        setSelectedListDeletedProperties([])
    }


    const onClickButtonСancel = () => {
        if(selectedListProperties.length > 0) {
            setSelectedListDeletedProperties((prev) => [...prev, selectedListProperties[selectedListProperties.length - 1]]);
            let notLastSelectedElementArray = selectedListProperties.filter( (item, index) => index != selectedListProperties.length - 1);
            setSelectedListProperties(notLastSelectedElementArray)
        }
    }


    const onClickButtonStepForward = () => { 
        if(selectedListDeletedProperties.length !== 0) {
            setSelectedListProperties((prev) => [...prev, selectedListDeletedProperties[selectedListDeletedProperties.length - 1]]);
            let notLastSelectedElementArray = selectedListDeletedProperties.filter( (item, index) => index != selectedListDeletedProperties.length - 1);
            setSelectedListDeletedProperties(notLastSelectedElementArray)
        } 
    }


    useEffect(() => {
        transformationsSelectedValues()
    }, [selectedListProperties])

    
    useEffect(() => {
        loadJson('https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json')
            .then((result) => customFlatArrMethod(result))
            .then((result) => customSplitArrMethod(result))
            .then((result) => setArrayDataSelect(result))
            .catch(() => setShowModalWindowError(true))
    }, [])


    return (
        <div className='app'>
            <ModalWindow closeModalWindowError={closeModalWindowError}  showModalWindowError={showModalWindowError} />
            <div className='container'>
                <div className='app__wrapper-flex'>
                    <ListSelect arrayDataSelect={arrayDataSelect} addSelectedPropertyState={addSelectedPropertyState} className='app__wrapper-flex__list-select' />
                    <div className='app__wrapper-flex__result-value'>
                        <ScreenSelectedValues  selectedListProperties={selectedListProperties} />
                        <div className='app__wrapper-flex__result-value__calculation-results'>
                            <CalculatedValues title='Перемноженные числовые значения:' calculatedValue={selectedMultipliedPropertiesNumbers} className='app__wrapper-flex__result-value__calculation-results__calculated-values' />
                            <CalculatedValues title='Хешированные строковые значения:' calculatedValue={selectedHashPropertiesString} className='app__wrapper-flex__result-value__calculation-results__calculated-values' />
                            <div className='app__wrapper-flex__result-value__calculation-results__management'>
                                <button onClick={onClickButtonReset}><p>Сброс</p></button>
                                <button className={selectedListProperties.length == 0 ? 'inactive' : ''} onClick={onClickButtonСancel}><p>Отмена</p></button>
                                <button className={selectedListDeletedProperties.length == 0 ? 'inactive' : ''} onClick={onClickButtonStepForward}><p>Вернуть</p></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}