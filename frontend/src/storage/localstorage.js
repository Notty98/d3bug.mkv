export const getMapFromStorage = () => {
    const stringMap = localStorage.getItem('selectedFeatures')
    if(!stringMap) {
        return new Map()
    }
    return new Map(JSON.parse(stringMap))
}

export const saveMapToStorage = (selectedFeatures) => {
    const hashMapString = JSON.stringify(Array.from(selectedFeatures.entries()))
    localStorage.setItem('selectedFeatures', hashMapString)
}