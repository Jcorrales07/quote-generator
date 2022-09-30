const newQuoteBtn = document.querySelector('.new-quote-button')
const quoteText = document.querySelector('.text')
const quoteAuthor = document.querySelector('.author')

const twitterBtn = document.querySelector('.twitter-button')
const API = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'

// creo que fetch tiene el problema de que los datos solo existen en la promesa
// y que no se pueden transferir, eso he experimentado
// Creo que ya se como solucionarlo aca pero lo voy a seguir abajo
// const generateQuotes = (apiUrl) => {
//     const fetchQuote = fetch(apiUrl)

//     let num = Math.round(Math.random() * 8261)
    
//     fetchQuote.then(response => response.json())
//     .then(data => {
//         if (data[num].text.length > 50) {
//             quoteText.classList.add('long-quote')
//         } else {
//             quoteText.classList.remove('long-quote')
//         }

//         quoteText.textContent = data[num].text
//         quoteAuthor.textContent = data[num].author
//     }).catch(err => console.error(err))
    
// }

// Otra version para conseguir los datos con async/await
let arrayQuotes = [];
const getQuotes = async (apiUrl) => {
    try {
        const response = await fetch(apiUrl) // lo que hace el await aqui es que va a esperar 
        //a tener la info para poder asignarsela a la variable.
        // Lo que espera es que se traiga la informacion de internet hasta aca en mi archivo 
        // para poder asignarse, si no daria error.
        arrayQuotes = await response.json(); // lo mismo aca
        
        let num = Math.round(Math.random() * arrayQuotes.length)

        if (arrayQuotes[num].text.length > 50) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }

        quoteText.textContent = arrayQuotes[num].text
        quoteAuthor.textContent = arrayQuotes[num].author

    } catch(error) {
        throw new Error(error)
    }
}

const tweetIt = () => {
    const twiterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`
    window.open(twiterUrl.trim(), '_blank')
}


newQuoteBtn.addEventListener('click', getQuotes.bind(this, API))
twitterBtn.addEventListener('click', tweetIt)

// quote automatico
getQuotes(API);

