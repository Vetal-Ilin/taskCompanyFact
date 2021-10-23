import React, {useState, useEffect} from 'react';
import './App.scss';


export default function App() {

    const [arrayRequest, setArrayRequest] = useState([])

    async function loadJson(url) {
        let response = await fetch(url);

        if (response.status === 200) {
            let json = await response.json(); 
            setArrayRequest(json)
            return
        }

        throw new Error(response.status);
    }

    useEffect(() => {
        loadJson('https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json')
            .catch(err => console.log(err))
    }, [])

    console.log(arrayRequest)

    return (
        <div className='app'>
           Проверка
        </div>
    )
}