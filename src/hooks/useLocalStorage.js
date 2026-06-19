import { useState } from "react";

export default function useLocalStorage(key) {
    const [data, setData] = useState(() => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : [];
    });

    const saveData = (newData) => {
        const updated = [...data, newData];

        localStorage.setItem(key, JSON.stringify(updated));
        setData(updated);
    };

    const updateData = (newData) => {
        localStorage.setItem(key, JSON.stringify(newData));
        setData(newData);
    };

    return [data, saveData, updateData];
}