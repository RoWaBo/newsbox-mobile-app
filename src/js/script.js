console.log('src/script.js is loaded');

fetchNews("https://rss.nytimes.com/services/xml/rss/nyt/Europe.xml")
    .then(response => {
        console.log(response);
    })











