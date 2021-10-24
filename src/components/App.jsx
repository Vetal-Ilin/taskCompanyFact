import React, {useState, useEffect} from 'react';
import ModalWindow from '@components/ModalWindow/ModalWindow.jsx';


export default function App() {

    const [arrayRequest, setArrayRequest] = useState([]);
    const [showModalWindowError, setShowModalWindowError] = useState(false);
    let smoothedАrray = [];

    const customFlatArrMethod = (arr) => {
        for (let item of arr) {
           if(Array.isArray(item)) {
               customFlatArrMethod(item)
           } else {
                smoothedАrray.push(item)
           }
        }
    }

    async function loadJson(url) {
        let response = await fetch(url);
        if (response.status === 200) {
            let json = await response.json();
            let resultingArray = [];
            for (let item in json) {
                resultingArray.push(json[item])
            } 
            setArrayRequest(resultingArray); //
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