import React, {useState, useEffect} from 'react';
import ModalWindow from '@components/ModalWindow/ModalWindow.jsx';


export default function App() {

    const [showModalWindowError, setShowModalWindowError] = useState(false);
    const [stateObjectArray, setStateObjectArray] = useState([]);
    const [stateNumberArray, setstateStateNumberArray] = useState([]);
    const [stateStringArray, setStateStringArray] = useState([]);
    const [stateBooleanArray, setstateStateBooleanArray] = useState([])

    const customSplitArrMethod = (arr) => {
        const objectArray = [];
        const numberArray = [];
        const stringArray = [];
        const booleanArray = [];

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

            }
        }
        setStateObjectArray(objectArray);
        setstateStateNumberArray(numberArray);
        setStateStringArray(stringArray);
        setstateStateBooleanArray(booleanArray);
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

    useEffect(() => {
        loadJson('https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json')
            .catch(() => setShowModalWindowError(true))
    }, [])

    return (
        <div className='app'>
            {showModalWindowError ? <ModalWindow closeModalWindowError={closeModalWindowError} /> : null}
            <select name="select" onChange={() => console.log('ok')} id="1" >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
    )
}