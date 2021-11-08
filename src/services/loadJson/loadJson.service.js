export default async function loadJson(url) {
    let response = await fetch(url);
    try {
        let json = await response.json();
        let resultingArray = [];
        for(let item in json) {
            resultingArray.push(json[item])
        } 
        return resultingArray
    } catch(err) {
        throw new Error(response.status)
    }
}