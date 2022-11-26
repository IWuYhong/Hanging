let words: string[] = [
    'JAVASCRIPT',
    'VUE',
    'REACT',
    'TRINIDAD',
    'PORTUGAL',
    'DINAMARCA',
    'COLOMBIA',
    'VENEZUELA'

]


export function getRandomWord(){
    const randomIndex = Math.floor(Math.random() * words.length );


    return words[randomIndex];
}