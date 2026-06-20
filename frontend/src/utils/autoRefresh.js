import { useEffect } from "react";

function useAutoRefresh(loadFunction, intervalMs = 5000) {

    useEffect(() => {

        loadFunction();

        const interval = setInterval(loadFunction, intervalMs);

        return () => clearInterval(interval);

    }, []);

}

export default useAutoRefresh;