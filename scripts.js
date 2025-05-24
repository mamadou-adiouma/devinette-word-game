"use strict"

const select = (el) => {
     return document.querySelector(el)
}


const create = (el) => {
     return document.createElement(el)
}


const alphabetics = ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'w', 'x', 'c', 'v', 'b', 'n', '-']
// const alphabetics = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-']


// Mettre en place la structure
const customElements = () => {
     // Select
     const section = select('section')

     // Create
     const h1 = create('h1')
     const p = create('p')
     const div = create('div')
     const header = create('header')
     const input = create('input')
     const button = create('button')
     const span = create('span')
     const span2 = create('span')

     // Classes
     section.classList.add("w-200", "p-5", "mx-auto", "bg-gray-200")
     h1.classList.add("w-full", "text-2xl", "uppercase", "text-center")
     p.classList.add("w-full", "flex", "items-center", "justify-center", "tracking-widest", "font-bold", "my-5", "p-2.5", "bg-gray-200", "border", "border-blue-300", "text-gray-900", "text-sm", "rounded-lg", "focus:border-blue-500")
     header.classList.add("w-full", "flex", "items-center", "gap-3", "flex-wrap")
     input.classList.add("w-full", "my-4", "p-2.5", "bg-gray-50", "border", "border-gray-300", "text-gray-900", "text-sm", "rounded-lg", "focus:border-blue-500")
     span.classList.add("w-full", "block", "mt-10", "text-center")
     button.classList.add("w-full", "cursor-pointer", "text-white", "bg-blue-700", "hover:bg-blue-800", "focus:ring-4", "focus-outline-none", "focus:ring-blue-300", "font-medium", "rounded-lg", "text-sm", "sm:w-auto", "px-5", "py-2.5", "text-center")
     div.classList.add("w-full", "rounded-md", "my-15", "grid", "grid-cols-7", "gap-2", "bg-gray-100", "p-5")
     span2.classList.add("bg-red-200", "order-2", "text-center", "cursor-pointer", "rounded-sm", "text-red-500", "font-extrabold", "text-lg", "p-0", "active:bg-red-300", "hover:bg-green-300")

     // Attrs
     p.id = "hidden-word"
     button.id = "guess-btn"
     input.id = "input"
     span.id = "span"
     input.type = "text"
     input.placeholder = "Entrer le mot deviné..."
     span2.id = "del"

     // Contents
     h1.innerText = "Deviner le mot suivant :"
     button.innerText = "Deviner"
     span2.innerText = "Effacer"

     // append in parent
     header.append(input, button)
     div.appendChild(span2)
     section.append(h1, p, header, span, div)

     //  Keyboard
     alphabetics.map((letter) => {
          div.innerHTML +=
               `
               <button class="letters bg-blue-700 cursor-pointer rounded-sm text-white font-extrabold text-lg p-0 active:bg-green-500 hover:bg-green-500">${letter}</button>
          `
     })
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
     //  Ecout de l'vennement clique sur le button "devinette"
     const handlerClick = () => {
          console.log('Mot deviné : ', wordToGuess)

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
                    select("#hidden-word").innerHTML = ''
                    const splited = wordToGuess.split('')
                    // splited.pop(splited[-1])
                    splited.forEach((letter) => {
                         select("#hidden-word").innerHTML += `<span class="bg-gray-900 text-xl text-green-300 mx-[0.5px] p-0 rounded-md w-10 h-10 text-center flex items-center justify-center text-center">${letter}</span>`
                    })

               }, 1000);

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
                    select("#hidden-word").innerHTML = ''
                    const splited = wordToGuess.split('')
                    // splited.pop(splited[-1])
                    splited.forEach((letter) => {
                         select("#hidden-word").innerHTML += `<span class="border border-green-300 text-xl w-10 h-10 bg-gray-900 text-green-300 mx-[0.5px] p-0 rounded-md flex items-center justify-center text-center">${letter}</span>`
                    })

               }, 500);

               select('button').innerText = 'Continuer'
               select('button').classList.add("bg-green-600", "hover:bg-green-800", "focus:ring-green-300")

               if (select('button').innerText.trim() === 'Continuer') {
                    select('#guess-btn').addEventListener('click', () => {
                         window.location.reload()
                    })
               }
          }
     }

     select('button').addEventListener('click', () => {
          handlerClick()
     })

     window.addEventListener('keypress', (e) => {
          if (e.key === "Enter") {
               handlerClick()
          }
     })

     select("#del").addEventListener("click", () => {
          // console.log(select("#input").value.length)
          const input = select("#input")
          input.focus()
          input.value = input.value.slice(0, input.value.length - 1)
     })

}

//  Capteur clavier.....
document.querySelectorAll('.letters').forEach((letter) => {
     letter.addEventListener('click', (e) => {
          select('#input').focus()
          select('#input').value += letter.innerText
     })
})


window.addEventListener('keydown', (e) => {
     select('#input').focus()
})



// Traitement sur les données reçues
const smt = (data) => {
     const wordsArr = data.split('\n')

     // Rendre aléatoire
     const wordMixedIndex = Math.floor(Math.random() * wordsArr.length)
     const wordToGuess = wordsArr[wordMixedIndex]

     console.log("Mot à deviner : ", wordToGuess)

     // Mot à deviner
     // Separer les lettres
     const splitedwordToGuess = wordToGuess.split('')
     splitedwordToGuess.pop()

     // Masquage aléatoirement de certaines lettres du mot normalisé (wordNormalized)
     const maskLetterByIndex = []
     const numsOfLetterTomask = Math.min(3, splitedwordToGuess.filter(letter => letter !== '').length)
     // let numsOfLetterTomask = Math.floor(Math.random() * (5 - 2 + 1)) + 2;

     // Choisir aléatoirement les index des lettres à masquer
     while (maskLetterByIndex.length < numsOfLetterTomask) {
          const randomIndex = Math.floor(Math.random() * splitedwordToGuess.length)
          if (splitedwordToGuess[randomIndex] !== '' && !maskLetterByIndex.includes(randomIndex)) {
               maskLetterByIndex.push(randomIndex)
          }

     }

     // Le mot final masqué
     const wordMasqued = [...splitedwordToGuess]   // La variable wordMasqued prend une copie du tableau original

     // Boucler sur le nouveau mot 
     for (const index of maskLetterByIndex) {
          if (wordMasqued[index] !== '') {
               wordMasqued[index] = `🟩`
          }
     }

     // Afficher le mot masqué dans le DOM

     wordMasqued.forEach((letter) => {
          select("#hidden-word").innerHTML += `<span class="bg-gray-900 text-xl text-white mx-[0.5px] p-0 rounded-md w-10 h-10 text-center flex items-center justify-center text-center">${letter}</span>`
     })

     //  Mot à trouver
     wordRender(wordToGuess)
}


// Recevoir les données
(async () => {
     try {
          const res = await fetch("words.txt", {
               method: 'GET',
               headers: {
                    'Content-Type': 'text/plain',
                    'Accept-Charset': 'UTF-8',
               }
          })

          const data = await res.text()
          smt(data)

     } catch (error) {
          select('#hidden-word').innerHTML = `<span>Erreur lors du chargement des données !</span>`
          console.log(error);
     }
})()





