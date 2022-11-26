import './App.css';
import { useEffect, useState } from 'react';
import { HangImage } from './components/HangImage';
import { getRandomWord } from './helpers/getRandomWord';
import { letters } from './helpers/letters';


function App() {


  const [word,setWord] = useState(getRandomWord);
  const [hiddenWord, setHiddenWord] = useState( '_ '.repeat( word.length ) );
  const [ attempts, setAttempts ] = useState(0);
  const [lose, setLose] = useState( false );
  const [won, setWon] = useState( false );

 //Determinar si la persona perdio
  useEffect(() => {
    
    if ( attempts >= 9){
      setLose(true)
      return;
    }

  }, [attempts]); //hooks

  //Determinar si la persona Ganó
  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if (currentHiddenWord == word){
      setWon(true);
    }
  }, [ hiddenWord] ); //hooks

  const checkLetter = ( letter: string) => {

    if ( lose ) return;
    if ( won ) return;

    if ( !word.includes(letter) ){
      setAttempts( Math.min( attempts + 1, 9) );   
      return;   
    }

    const hiddenWordArray = hiddenWord.split(' ');

    for ( let i = 0; i < word.length; i++){
      if (word[i] == letter){
        hiddenWordArray[i] = letter;
      }
    }

    setHiddenWord(hiddenWordArray.join(' '));

  }


  const newGame = () =>{
    const newWord = getRandomWord();

    setWord(newWord);
    setHiddenWord('_ '.repeat( newWord.length ));
    setAttempts(0);
    setLose(false);
    setWon(false);
  }

  return (
    <div className="App">
      
        {/* Imagenes */}
          <HangImage imageNumber = { attempts  } />

        {/* Palabra Oculta */}
          <h3>{hiddenWord}</h3>

        {/* Contador */}
          <h3>Intentos: {attempts}</h3>

        {/* Mensaje si perdio */}
        {
          ( lose ) 
          ? <h2>Perdio, la palabra era { word }</h2>
          : ''
        }


        {/* Mensaje si perdio */}
        {
          ( won ) 
          ? <h2>Felicidades usted gano</h2>
          : ''
        }


        {/* Botones de letras */}
      {
          letters.map((letter) => (
            <button 
            onClick={() => checkLetter(letter)}
            key={letter}>
              {letter}
              </button>
          ) )
      }
      

      <br/><br/>
      <button onClick={newGame}>¿Reiniciar?</button>

    </div>
  );
};

export default App;