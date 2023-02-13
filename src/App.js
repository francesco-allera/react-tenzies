import React from "react";
import Die from "./Die";
import Confetti from "./Confetti";

export default function App() {
    function dieNumber() {
        return Math.ceil(Math.random() * 6);
    }
    function allNewDice() {
        const arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push({
                value: dieNumber(),
                isHeld: false
            });
        }
        return arr;
    }
    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map((die, i) => {
                if (!die.isHeld)
                die.value = dieNumber();
                return die;
            }));
            setScore(prevScore => prevScore + 1);
        } else {
            setTenzies(false);
            setScore(1);
            setDice(allNewDice());
        }
    }
    function holdDice(idx) {
        setDice(oldDice => oldDice.map((die, i) => {
            if (i === idx)
                die.isHeld = !die.isHeld;
            return die;
        }));
    }

    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);
    const [score, setScore] = React.useState(1);
    const [record, setRecord] = React.useState(
        parseInt(localStorage.getItem("record")) || 0
    );

    const diceElements = dice.map((die, i) => (
        <Die
            key={i}
            value={die.value}
            isHeld={die.isHeld}
            handleClick={() => holdDice(i)}
        />
    ));

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld);

        if (allHeld) {
            const allSame = dice.every(die => die.value === dice[0].value);

            if (allSame) {
                setTenzies(true);

                const x = record === 0 ? score : (score < record ? score : record);
                setRecord(x);
                localStorage.setItem("record", x);
            }
        }
    }, [dice]);

    return (
        <main>
            { tenzies && <Confetti /> }
            <div>
                <h1>
                    Tenzies
                </h1>
                <p>
                    Roll until all dice are the same.
                    Click each die to freeze it at its current value between rolls.
                </p>
            </div>
            <section>
                {diceElements}
            </section>
            <button className="btn" onClick={rollDice} >
                { tenzies ? "New Game" : "Roll" }
            </button>
            <div className="score">
                <span>Actual Score: {score}</span>
                <span>Record: {record}</span>
            </div>
        </main>
    )
}