import React, {useState, useEffect} from 'react';
import './App.scss';


export default function App() {

    const [arrayRequest, setArrayRequest] = useState([])

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json')
         .then(res => res.json())
         .then(res => setArrayRequest(res))
         .catch(err => console.log(err))
    }, [])

    console.log(arrayRequest)

    return (
        <div className='app'>
           Проверка
        </div>
    )
}