export default function customFlatArrMethod(arr) {
    let smoothedАrray = [];
    function recursiveFunction(arr) {
        for(let item of arr) {
            if(Array.isArray(item)) {
                recursiveFunction(item)
            } else {
                smoothedАrray.push(item)
            }
         }
    }
    recursiveFunction(arr);
    return smoothedАrray
}