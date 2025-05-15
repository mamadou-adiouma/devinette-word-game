"use strict"



const select = (el) => {
     return document.querySelector(el)
}

const create = (el) => {
     return document.createElement(el)
}


// Mettre en place la structure
const customElements = () => {

     // Select
     const section = select('section')


     // Create
     const h1 = create('h1')
     const p = create('p')
     const header = create('header')
     const input = create('input')
     const button = create('button')
     const span = create('span')


     // Classes
     section.classList.add("max-w-xs", "mx-auto")
     h1.classList.add("w-100")
     h1.classList.add("max-w-xs", "text-2xl", "uppercase", "text-center")
     p.classList.add("max-w-xs", "text-center", "tracking-widest", "font-bold", "my-5", "mx-auto", "p-2.5", "bg-gray-200", "border", "border-blue-300", "text-gray-900", "text-sm", "rounded-lg", "focus:border-blue-500")
     header.classList.add("max-w-xs", "flex", "items-center", "gap-3", "flex-wrap")
     input.classList.add("max-w-xs", "mx-auto", "my-4", "w-80", "p-2.5", "bg-gray-50", "border", "border-gray-300", "text-gray-900", "text-sm", "rounded-lg", "focus:border-blue-500")
     span.classList.add("max-w-xs", "block", "mt-10", "text-center")
     button.classList.add("max-w-xs", "mx-auto", "cursor-pointer", "text-white", "bg-blue-700", "hover:bg-blue-800", "focus:ring-4", "focus-outline-none", "focus:ring-blue-300", "font-medium", "rounded-lg", "text-sm", "sm:w-auto", "px-5", "py-2.5", "text-center")


     // Attrs
     p.id = "hidden-word"
     button.id = "guess-btn"
     input.id = "input"
     span.id = "span"
     input.type = "text"
     input.placeholder = "Entrer le mot deviné..."


     // Contents
     h1.innerText = "Deviner le mot suivant :"
     button.innerText = "Deviner"


     // append in parent
     header.append(input, button)
     section.append(h1, p, header, span)
}
customElements()



const addErrorsClasses = () => {
     select('#span').classList.add("border", "border-red-500", "text-red-600", "p-3", "mt-8", "rounded-md")
     select('#input').classList.add("border", "border-red-500", "outline-red-500", "text-red-600")
}

const removeErrorsClasses = () => {
     select('#span').classList.remove("border", "border-red-500", "text-red-600", "p-3", "mt-8", "rounded-md")
     select('#input').classList.remove("border", "border-red-500", "outline-red-500", "text-red-600")
}

// Ecouter l'événnement input.....les actions de l'utilisateur
const wordRender = (wordToGuess) => {
     const input = select('#input')
     select('button').addEventListener('click', () => {
          console.log('Mot deviné : ', input.value)
          if (input.value.trim() === '') {
               select('#span').innerText = "Veillez entrer un mot !"
               select('#input').value = ''
               select('#input').focus()
               addErrorsClasses()
          } else if (
               input.value.trim().toLocaleLowerCase() !== wordToGuess.trim().toLocaleLowerCase() &&
               input.value.normalize("NFD").replace(/[\u0300-\u036f]/g, '').trim().toLocaleLowerCase()
               !== wordToGuess.normalize("NFD").replace(/[\u0300-\u036f]/g, '').trim().toLocaleLowerCase()) {
               select('#span').innerText = "Réponse incorrecte !"
               addErrorsClasses()

               setTimeout(() => {
                    select('#hidden-word').innerText = wordToGuess.trim().charAt(0).toLocaleUpperCase() + wordToGuess.slice(1)
                    select('#hidden-word').classList.add("text-green-600")
               }, 500);

               select('#input').focus()
               select('button').innerText = 'Recommencer'
               select('button').classList.add("bg-red-600", "hover:bg-red-800", "focus:ring-red-300", "py-2.5")

               if (select('button').innerText.trim() === 'Recommencer') {
                    select('#guess-btn').addEventListener('click', () => {
                         window.location.reload()
                    })
               }

          } else {
               removeErrorsClasses()
               select('#span').classList.add("border", "border-green-500", "text-green-600", "p-3", "mt-12", "rounded-md")
               select('#span').innerText = "Félicitations, réponse correcte !"
               select('#input').classList.add("border", "border-green-500", "outline-green-500", "text-green-600")

               setTimeout(() => {
                    select('#hidden-word').innerText = wordToGuess.trim().charAt(0).toLocaleUpperCase() + wordToGuess.slice(1)
                    select('#hidden-word').classList.add("text-green-600")
               }, 500);

               select('button').innerText = 'Continuer'
               select('button').classList.add("bg-green-600", "hover:bg-green-800", "focus:ring-green-300")

               if (select('button').innerText.trim() === 'Continuer') {
                    select('#guess-btn').addEventListener('click', () => {
                         window.location.reload()
                    })
               }
          }
     })
}


// Traitement sur les données reçues
const smt = (datas) => {
     const wordsArr = datas.split('\n')

     const wordMixedIndex = Math.floor(Math.random() * wordsArr.length)
     const wordToGuess = wordsArr[wordMixedIndex]

     // ** Enlever les accents du mot / détacher les lettres / séparer les avec (_) / Supprimer les espaces
     // ** Enlever le dernier (_)
     const wordNormalized = wordToGuess.normalize("NFD")
          .replace(/[\u0300-\u036f]/g, '') // enlevement des accents......
          .split('')
          .join('')
          .trim()
     //.replace(/_$/, '')  // ** Enlever le dernier underscare (_) du mot


     // Masquage aléatoirement de certaines lettres du mot normalisé (wordNormalized)
     const lettersNormalized = wordNormalized.split('')
     const maskLetterByIndex = []
     const numsOfLetterTomask = Math.min(3, lettersNormalized.filter(letter => letter !== '').length) // Choisir seulement les lettres (3lettres) et ignorer les (_)

     console.log(lettersNormalized)
     console.log(numsOfLetterTomask)

     // Choisir aléatoirement les index des lettres à masquer
     while (maskLetterByIndex.length < numsOfLetterTomask) {
          const randomIndex = Math.floor(Math.random() * lettersNormalized.length)

          if (lettersNormalized[randomIndex] !== '' && !maskLetterByIndex.includes(randomIndex)) {
               maskLetterByIndex.push(randomIndex)
          }
     }

     // Le mot final masqué
     const wordMasqued = [...lettersNormalized]

     // Boucler sur le nouveau mot 
     for (const index of maskLetterByIndex) {
          if (wordMasqued[index] !== '') {
               wordMasqued[index] = `�`
               // wordMasqued[index] = `...`
          }
     }

     const finalMaskedWord = wordMasqued.join('')
     select('#hidden-word').innerText = finalMaskedWord.trim().charAt(0).toLocaleUpperCase() + finalMaskedWord.slice(1)
     wordRender(wordToGuess)

     console.log('Mot normalisé : ', wordNormalized)
     console.log('Index mot à deviner: ', wordMixedIndex)
     console.log('Mot à deviner par le user : ', wordToGuess)
     console.log('Mot masqué : ', finalMaskedWord)
     console.log('Mot deviné par le user : ', wordRender(wordToGuess))
}


// Recevoir les données
(async () => {
     try {
          const res = await fetch("words.txt", {
               method: 'GET',
               headers: {
                    'Content-Type': 'text/plain',
                    'Accept-Charset': 'utf-8',
               }
          })

          const datas = await res.text()
          smt(datas)

     } catch (error) {
          select('#hidden-word').innerHTML = `<span>Erreur lors du chargement des données !</span>`
          console.log(error);
     }
})()





