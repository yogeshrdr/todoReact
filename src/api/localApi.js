const setLocalStorage = (key, localData) => {
    localStorage.setItem(key, JSON.stringify(localData));
    return;
}

const getLocalStorage = (key) => {
    const localData = localStorage.getItem(key);
    return JSON.parse(localData);
}


export {setLocalStorage, getLocalStorage};
