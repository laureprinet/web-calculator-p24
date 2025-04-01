// NOTE: 
// This is the starter file for a blog post "How to build a calculator". You can follow the lesson at https://zellwk.com/blog/calculator-part-1

// # START EDITING YOUR JAVASCRIPT HERE
// ===============

//Constantes qui sont initialisés et jamais modifiées
const calculator = document.querySelector('.calculator') //la calculatrice
const keys = calculator.querySelector('.calculator__keys') //les touches
const display = document.querySelector('.calculator__display') //l'écran d'affichage



keys.addEventListener('click', e => {
  const key = e.target 
  const action = key.dataset.action //si opération ou égal ou décimal
  const  keyContent = key.textContent //La valeur de la touche
  const displayedNum = display.textContent // La valeur sur l'écran de la calculatrice
  const previousKeyType = calculator.dataset.previousKeyType // Type de l'ancienne touche en mémoire

  // On fait une boucle pour toujours relacher les classes
  Array.from(key.parentNode.children).forEach(k=>
    k.classList.remove('is-depressed')
  )


  // Si la touche pressée est un nombre : 

  if (!action) {
    //Il faut différencier deux cas :
    // Celui où l'écran affiche 0 ou on vient de taper sur une opération auxquels cas on remplace par le nouveau nombre :
    if (displayedNum==='0' || previousKeyType==='operator') {
      display.textContent=keyContent
    } else {
    //Sinon, il faut concaténer le nombre précédent avec le nouveau : 
    display.textContent=display.textContent+keyContent
    }
    calculator.dataset.previousKeyType='number'
  }

  //Si c'est une opération : 

  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) {
    key.classList.add('is-depressed') //On rajoute une nouvelle classe aux opérations qui permettra de "lâcher" l'ancien nombre.
    calculator.dataset.previousKeyType='operator' //On rajoute cela pour garder en mémoire le fait de passer d'un nombre avant l'opération à celui d'après
    calculator.dataset.firstValue = displayedNum //On veut se rappeler pour pouvoir faire les égalités
    calculator.dataset.operator = action
  }

  // Si c'est le = :
  if (
    action === 'calculate'
  ) {
    //On doit se rappeler de la première valeur, l'oppération, et la deuxième valeur
    const firstValue = parseFloat(calculator.dataset.firstValue) //On veut pas avoir à faire à des chaînes de caractère
    const operator=calculator.dataset.operator
    const secondValue=parseFloat(displayedNum) 
    let result = 0  //On changera la valeur ensuite


    if (operator === 'add') {
      result = firstValue + secondValue
    } else if (operator === 'subtract') {
      result = firstValue - secondValue
    } else if (operator === 'multiply') {
      result = firstValue * secondValue
    } else if (operator === 'divide') {
      result = firstValue / secondValue
    }

    display.textContent= result

    calculator.dataset.previousKeyType='calculate'
  }

  // Si c'est le Effacer
  if (
    action === 'clear'
  ) {
    display.textContent='0'
    calculator.dataset.previousKeyType='clear'
  }

  // Si c'est la touche Décimal : on repasse tout à 0
  if (
    action === 'decimal'
  ) {
    console.log('Décimal')
    calculator.dataset.previousKeyType='decimal'
  }


  console.log(e.target.textContent)  //Affiche dans la console les valeurs des touches (pour vérification)
})





