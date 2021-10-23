import React, {useState, useEffect} from 'react';
import ModalWindow from '@components/ModalWindow/ModalWindow.jsx';


export default function App() {

    const [arrayRequest, setArrayRequest] = useState([]);
    const [showModalWindowError, setShowModalWindowError] = useState(false)

    async function loadJson(url) {
        let response = await fetch(url);

        if (response.status === 200) {
            let json = await response.json();
            let resultingArray = [];
            for (let item in json) {
                resultingArray.push(json[item])
            } 
            setArrayRequest(resultingArray);
            return
        }

        throw new Error(response.status);
    }

    useEffect(() => {
        loadJson('https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json')
            .catch(() => setShowModalWindowError(true))
    }, [])

    console.log(arrayRequest)

    return (
        <div className='app'>
            <ModalWindow showModalWindowError={showModalWindowError} />
        </div>
    )
}