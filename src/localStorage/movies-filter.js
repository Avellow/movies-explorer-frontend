export const setToLocalStorage = (key, value) => {
    try {
        const stringifiedValue = typeof value === 'string' ? value : JSON.stringify(value)
        localStorage.setItem(key, stringifiedValue)
    } catch(e) {
        console.log(e)
        return undefined
    }
}

export const getFromLocalStorage = (key, shouldBeParsed = false) => {
    try {
        const value = localStorage.getItem(key)
        return (shouldBeParsed ? JSON.parse(value) : value) || undefined
    } catch(e) {
        console.log(e)
        return undefined
    }
}

