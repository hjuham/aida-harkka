import { useEffect } from "react";

export default function useEsc(setDisplay, setSearch) {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                if (setDisplay) {
                    setDisplay(false);
                }
                if (setSearch) {
                    setSearch("");
                }
            }
        };
        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [setDisplay, setSearch]);
}
