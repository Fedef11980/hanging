import { useEffect, useState } from "react";
import { letters } from "./helpers/letters";
import { HangImage } from "./components/HanImage";
import { getRandomWord } from "./helpers/getRandomWords";
import "./App.css";

function App() {
  const [word, setWord] = useState(getRandomWord());
  const [hiddenWord, setHiddenWord] = useState("_ ".repeat(word.length));
  const [attemps, setAttemps] = useState(0);
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

  //determinar si la persona perdió
  //hooks
  useEffect(() => {
    if (attemps >= 9) {
      setLose(true);
    }
  }, [attemps]);

  //Determinar si la persona ganó
  useEffect(() => {
    const currentHinddenWord = hiddenWord.split(" ").join("");
    if (currentHinddenWord === word) {
      setWon(true);
    }
  }, [hiddenWord, word]);

  const checkLetter = (letter: string) => {
    if (lose) return;
    if (won) return;

    if (!word.includes(letter)) {
      setAttemps(Math.min(attemps + 1, 9));
      return;
    }

    const hiddenWordArray = hiddenWord.split(" ");
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWordArray[i] = letter;
      }
    }

    setHiddenWord(hiddenWordArray.join(" "));
  };

  const newGame = () =>{
    const newWord = getRandomWord();
    setWord(newWord)
    setHiddenWord("_ ".repeat(word.length));
    setAttemps(0)
    setLose(false)
    setWon(false)    
  }

  return (
    <div className="App">
      {/* Imagenes */}
      <HangImage imageNumber={attemps} />

      {/* palabra oculta */}
      <h3>{hiddenWord}</h3>

      {/* contador de intentos */}
      <h3>Intento = {attemps}</h3>

      {/*Mensaje si perdió*/}
      {lose ? <h2>Perdió {word}</h2> : ""}
      {/*Mensaje si ganó*/}
      {won ? <h2>Felicidades usted Ganó, la palabra es: {word}</h2> : ""}

      {/* botones de letra*/}
      {letters.map((letter) => (
        <button onClick={() => checkLetter(letter)} key={letter}>
          {letter}
        </button>
      ))}

      <br />
      <br />
      <button onClick={newGame} >Nuevo juego</button>
    </div>
  );
}

export default App;
