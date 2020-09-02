export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) return  undefined
        else return JSON.parse(serializedState)
    } catch (e) {
        return undefined
    }
}

export const saveState = (state) => localStorage.setItem('state', JSON.stringify(state))