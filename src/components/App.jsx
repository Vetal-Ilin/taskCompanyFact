import React, {useState, useEffect} from 'react';
import ModalWindow from '@components/ModalWindow/ModalWindow.jsx';
import ListSelect from '@components/ListSelect/ListSelect';
import ScreenSelectedValues from '@components/ScreenSelectedValues/ScreenSelectedValues';
import CalculatedValues from '@components/CalculatedValues/CalculatedValues';
import {sha256} from 'js-sha256'; 


export default function App() {

    const [showModalWindowError, setShowModalWindowError] = useState(false);
    const [arrayDataSelect, setArrayDataSelect] = useState([]);
    const [selectedListProperties, setSelectedListProperties] = useState([]);
    const [firstSelectedElementArray, setFirstSelectedElementArray] = useState([]);
    const [selectedListPropertiesNumbers, setSelectedListPropertiesNumbers] = useState([]);
    const [selectedMultipliedPropertiesNumbers, setSelectedMultipliedPropertiesNumbers] = useState([]);
    const [selectedListPropertiesString, setSelectedListPropertiesString] = useState([]);
    const [selectedHashPropertiesString, setSelectedhashPropertiesString] = useState([])

    const customSplitArrMethod = (arr) => {
        const objectArray = [];
        const numberArray = [];
        const stringArray = [];
        const booleanArray = [];
        const allArray = [];

        for(let item of arr) {
            if(typeof item === 'object' & item !== null) {
                objectArray.push(item)
            }
            if(typeof item === 'number') {
                numberArray.push(item)
            }
            if(typeof item === 'string') {
                stringArray.push(item)
            }
            if(typeof item === 'boolean') {
                booleanArray.push(item)
            }
        }

        if(objectArray.length !== 0) {
            allArray.push(objectArray)
        } 
        if(numberArray.length !== 0) {
            allArray.push(numberArray)
        } 
        if(stringArray.length !== 0) {
            allArray.push(stringArray)
        } 
        if(booleanArray.length !== 0) {
            allArray.push(booleanArray)
        }
        setArrayDataSelect(allArray)
    }

    const customFlatArrMethod = (arr) => {
        let smoothedАrray = [];
        function recursiveFunction(arr) {
            for (let item of arr) {
                if(Array.isArray(item)) {
                    recursiveFunction(item)
                } else {
                    smoothedАrray.push(item)
                }
             }
        }
        recursiveFunction(arr);
        customSplitArrMethod(smoothedАrray);   
    }

    async function loadJson(url) {
        let response = await fetch(url);
        if (response.status === 200) {
            let json = await response.json();
            let resultingArray = [];
            for (let item in json) {
                resultingArray.push(json[item])
            } 
            customFlatArrMethod(resultingArray);
            return
        }
        throw new Error(response.status);
    }

    const closeModalWindowError = () => {
        setShowModalWindowError(false)
    }

    const addSelectedPropertyState = ({value, dataType}) => {
        setFirstSelectedElementArray(selectedListProperties[0])
        if(selectedListProperties.length < 10) {
            setSelectedListProperties((prev) => [...prev, value])
        } else {
            let notFirstSelectedElementArray = selectedListProperties.filter( (item, index) => index != 0)
            setSelectedListProperties(notFirstSelectedElementArray.concat(value))
        }
        if(dataType === 'number') {
            setSelectedListPropertiesNumbers((prev) => [...prev, value])
        }
        if(dataType === 'string') {
            setSelectedListPropertiesString((prev) => [...prev, value])
        }
    }
   
    const multiplicationNumericValues = () => {
        if(selectedListPropertiesNumbers.length > 1) {
            const multipliedValues = [];
            const arrClone = multipliedValues.concat(selectedListPropertiesNumbers);
            let MultipliedArr = arrClone.reduce((mull, current) => mull * current);
            setSelectedMultipliedPropertiesNumbers(MultipliedArr)
        } else {
            setSelectedMultipliedPropertiesNumbers(selectedListPropertiesNumbers[0])
        }  
    }

    const calculateHashString = () => {
        if(selectedListPropertiesString.length > 0) {
            const allSelectionString = [];
            const arrClone = allSelectionString.concat(selectedListPropertiesString);
            let hashArr = sha256(arrClone);
            setSelectedhashPropertiesString(hashArr);
        }
    }

    useEffect(() => {
        calculateHashString()
    }, [selectedListPropertiesString])

    useEffect(() => {
        multiplicationNumericValues()
    }, [selectedListPropertiesNumbers])
    
    useEffect(() => {
        loadJson('https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json')
            .catch(() => setShowModalWindowError(true))
    }, [])

    return (
        <div className='app'>
            {showModalWindowError ? <ModalWindow closeModalWindowError={closeModalWindowError} /> : null}
            <div className='container'>
                <div className='app__wrapper-flex'>
                    <ListSelect arrayDataSelect={arrayDataSelect} selectedListPropertiesNumbers={selectedListPropertiesNumbers} addSelectedPropertyState={addSelectedPropertyState} className='app__wrapper-flex__list-select' />
                    <div className='app__wrapper-flex__result-value'>
                        <ScreenSelectedValues  selectedListProperties={selectedListProperties} />
                        <div className='app__wrapper-flex__result-value__calculation-results'>
                            <CalculatedValues title='Перемноженные числовые значения' calculatedValue={selectedMultipliedPropertiesNumbers} className='app__wrapper-flex__result-value__calculation-results__calculated-values' />
                            <CalculatedValues title='Хешированные строковые значения' calculatedValue={selectedHashPropertiesString} className='app__wrapper-flex__result-value__calculation-results__calculated-values' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}