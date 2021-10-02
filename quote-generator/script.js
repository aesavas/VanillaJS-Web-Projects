//* Select DOM Elements
const quoteElements = {
    container: document.querySelector('#quote-container'),
    text: document.querySelector('#quote'),
    author: document.querySelector('#author')
};

const buttons = {
    copyButton: document.querySelector('#copy'),
    newQuoteButton: document.querySelector('#new-quote')
};

const loader = document.querySelector('#loader');

let quoteList = [];


function showLoadingSpinner() {
    quoteElements.container.hidden = true;
    loader.hidden = false;
}

function hideLoadingSpinner() {
    quoteElements.container.hidden = false;
    loader.hidden = true;
}

function pickQuote() {
    showLoadingSpinner();
    //* Pick a random quote from quote array
    const quote = quoteList[Math.floor(Math.random() * quoteList.length)];
    quoteElements.text.textContent = quote.text;
    //* Check the quote has a author or not
    if (!quote.author) quoteElements.author.textContent = "Unknown";
    else quoteElements.author.textContent = quote.author;
    //* Check the quote has more than 50 characters.
    if (quote.text.length > 100) quoteElements.text.classList.add('long-quote');
    else quoteElements.text.classList.remove('long-quote');
    hideLoadingSpinner();
}

async function getQuotes() {
    //* Get Quotes From API
    const apiUrl = "https://type.fit/api/quotes";
    try {
        showLoadingSpinner();
        const response = await fetch(apiUrl);
        quoteList = await response.json();
        pickQuote();
    } catch (error) {
        alert(error);
    }
}

buttons.newQuoteButton.addEventListener('click', function () {
    pickQuote();
});

buttons.copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(quoteElements.text.textContent);
    const tooltip = document.querySelector('#tooltip');
    tooltip.textContent = 'Quote Copied';
})

buttons.copyButton.addEventListener('mouseout', () => {
    const tooltip = document.querySelector('#tooltip');
    tooltip.textContent = 'Copy to Clipboard';
})

//* Get Quotes
getQuotes();