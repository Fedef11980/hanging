
const words: string [] = [
    "COMPUTADORA", 
    "AGUACATE", 
    "PAPAYA",
    'VEHICULO', 
    'ANIMAL',
    'VETERINARIO',
    'CELULAR',
    'TELEFONO',
    'FORMULA 1' 
] 

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() *  words.length); 
    return words [randomIndex];    
}