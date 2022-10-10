const twitterBtn = document.querySelector('.twitter-button');
const newQuoteBtn = document.querySelector('.new-quote-button');
const quoteText = document.querySelector('.text');
const quoteAuthor = document.querySelector('.author');
const loader = document.getElementById('loader');
const mainContainer = document.getElementById('main-container');

const API = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';



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
const fetchQuotes = async (apiUrl) => {
    try {
        const response = await fetch(apiUrl); // lo que hace el await aqui es que va a esperar
        //a tener la info para poder asignarsela a la variable.
        // Lo que espera es que se traiga la informacion de internet hasta aca en mi archivo
        // para poder asignarse, si no daria error.
        arrayQuotes = await response.json(); // lo mismo aca
        getQuotes();

    } catch (error) {
        throw new Error(error);
    }
};

const getQuotes = () => {
    loading()
    let num = Math.round(Math.random() * arrayQuotes.length);

    if (arrayQuotes[num].text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = arrayQuotes[num].text;
    quoteAuthor.textContent = arrayQuotes[num].author;
    complete()
};

// Entonces lo que aprendi para hacer este feature, es siempre pensar
// que ya hay una solucion a lo que queres hacer, fijo hay una API que lo
// solucione, lo bueno es que investigaste sobre el window.open()
// Aca lo que tenes que tomar en cuenta tambien es en las variables que ya
// has creado, se pueden usar y no siempre se tienen que pasar por parametro
const tweetIt = () => {
    const twiterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twiterUrl.trim(), '_blank');
};

function loading() {
    loader.style.display = 'block'
    mainContainer.style.display = 'none'
}

function complete() {
    mainContainer.style.display = 'block'
    loader.style.display = 'none'
}

newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetIt);

// quote automatico
// Con este setTimeout hago el simulacro que esta cargando
// Ya que carga muy rapido pero con este random ya lo hace 
// parecer mas normal 
setTimeout(() => {
    fetchQuotes(API);
}, Math.round(Math.random() * 6000))
loading()

