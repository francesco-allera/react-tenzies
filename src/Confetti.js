import React from 'react'
import Confetti from 'react-confetti'

export default () => {
    const [windowMeasure, setWindowMeasure] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    React.useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowMeasure({
                width: window.innerWidth,
                height: window.innerHeight
            });
        })
    }, []);

    return (
        <Confetti
            width={windowMeasure.width}
            height={windowMeasure.height}
        />
    )
}