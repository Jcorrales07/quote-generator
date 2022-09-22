const newQuoteBtn = document.querySelector('.new-quote-button')
const quoteText = document.querySelector('.text')
const quoteAuthor = document.querySelector('.author')

const generateQuotes = () => {
    const fetchQuote = fetch('https://jacintodesign.github.io/quotes-api/data/quotes.json')

    let num = Math.round(Math.random() * 8261)

    fetchQuote.then(response => response.json())
                .then(data => {
                    quoteText.textContent = data[num].text
                    quoteAuthor.textContent = data[num].author
                }).catch(err => console.error(err))
}


newQuoteBtn.addEventListener('click', generateQuotes)
generateQuotes();

