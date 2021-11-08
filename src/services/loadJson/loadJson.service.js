export default async function loadJson(url) {
    let response = await fetch(url);
    if(response.status === 200) {
        let json = await response.json();
        let resultingArray = [];
        for(let item in json) {
            resultingArray.push(json[item])
        } 
        return resultingArray
    }
    throw new Error(response.status)
}