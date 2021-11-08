export default function customSplitArrMethod(arr) {
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
    return allArray
}