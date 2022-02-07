import { useEffect, useState } from "react";

export default (isMounted: boolean, delayTime: number) => {

    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        let timeoutId: any;
        if (isMounted && !shouldRender) {
            setShouldRender(true);
        } else if (!isMounted && shouldRender) {
            timeoutId = setTimeout(
                () => setShouldRender(false),
                delayTime
            );
        }
        return () => clearTimeout(timeoutId);
    }, [isMounted, delayTime, shouldRender]);
    return shouldRender;

};