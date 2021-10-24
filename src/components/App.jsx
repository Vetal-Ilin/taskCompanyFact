import React, {useState, useEffect} from 'react';
import ModalWindow from '@components/ModalWindow/ModalWindow.jsx';


export default function App() {

    const [showModalWindowError, setShowModalWindowError] = useState(false);
    const [stateObjectArray, setStateObjectArray] = useState([]);
    const [stateNumberArray, setstateStateNumberArray] = useState([]);
    const [stateStringArray, setStateStringArray] = useState([]);

    const customSplitArrMethod = (arr) => {
        const objectArray = [];
        const numberArray = [];
        const stringArray = [];
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
        }
        setStateObjectArray(objectArray)
        setstateStateNumberArray(numberArray)
        setStateStringArray(stringArray)
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
        </div>
    )
}