'use client'

export function saveData(key: string, data: any) {
    const isSenderExists = localStorage.getItem(key);

    console.log(key, isSenderExists)

    //check if sender data is already exists
    if (isSenderExists) {
        //parse the existing data
        const existingData = JSON.parse(isSenderExists);
        //update the existing data
        existingData.unshift(data);

        //keep only the latest 5 entries
        if (existingData.length > 5) {
            existingData.pop();
        }

        //save the updated data
        localStorage.setItem(key, JSON.stringify(existingData));
    } else {
        localStorage.setItem(key, JSON.stringify([data]));
    }
}