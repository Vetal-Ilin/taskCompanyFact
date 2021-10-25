import React, {useState, useEffect} from 'react';
import ModalWindow from '@components/ModalWindow/ModalWindow.jsx';
import ListSelect from '@components/ListSelect/ListSelect';
import ScreenSelectedValues from '@components/ScreenSelectedValues/ScreenSelectedValues';
import ScreenMultipliedValues from '@components/ScreenMultipliedValues/ScreenMultipliedValues';


export default function App() {

    const [showModalWindowError, setShowModalWindowError] = useState(false);
    const [arrayDataSelect, setArrayDataSelect] = useState([]);
    const [selectedListProperties, setSelectedListProperties] = useState([]);
    const [firstSelectedElementArray, setFirstSelectedElementArray] = useState([]);
    const [selectedListPropertiesNumbers, setSelectedListPropertiesNumbers] = useState([]);

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
            multiplicationNumericValues(value)
        }
    }

    const multiplicationNumericValues = (namber) => {
        console.log(namber)
        if(selectedListPropertiesNumbers.length != 0) {
            let multipliedValues = selectedListPropertiesNumbers.reduce((mul, current) => mul * current, 0);
            setSelectedListPropertiesNumbers(multipliedValues)
        } else {
            setSelectedListPropertiesNumbers(namber)
        }
    }

    useEffect(() => {
        loadJson('https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json')
            .catch(() => setShowModalWindowError(true))
    }, [])

    return (
        <div className='app'>
            {showModalWindowError ? <ModalWindow closeModalWindowError={closeModalWindowError} /> : null}
            <div className='container'>
                <div className='app__wrapper-flex'>
                    <ListSelect arrayDataSelect={arrayDataSelect}  addSelectedPropertyState={addSelectedPropertyState} className='app__wrapper-flex__list-select' />
                    <div className='app__wrapper-flex__result-value'>
                        <ScreenSelectedValues  selectedListProperties={selectedListProperties} />
                        <ScreenMultipliedValues />
                    </div>
                </div>
            </div>
        </div>
    )
}