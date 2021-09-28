const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const btnTwitter = document.getElementById("twitter");
const nextQuote = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let Quote_list = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function finish() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuotes() {
  loading();
  const quote = Quote_list[Math.floor(Math.random() * Quote_list.length)];
  if (quote.auther === null) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = quote.author;
  }
  if (quote.text.length > 140) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  finish();
}

// Get Quotes
async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    Quote_list = await response.json();
    newQuotes();
  } catch (error) {
    // Error Handling
  }
}

function twitterQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "blank");
}

nextQuote.addEventListener("click", newQuotes);
btnTwitter.addEventListener("click", twitterQuote);

getQuotes();
