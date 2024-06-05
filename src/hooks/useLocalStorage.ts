import { useEffect, useState } from "react";

//We use a generic type parameter <T> to allow the hook to work with any type of value.
export default function useLocalStorage<T>(key: string, defaultValue: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue) as T;

        if (typeof defaultValue === "function") {
            return (defaultValue as () => T)();
        } else {
            return defaultValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}