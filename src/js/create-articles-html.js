// distElmnt is the card section
function getNYTArticles(category, distElmnt, btnMode) {
    category = category.toLowerCase()
    
    fetchNews(`https://rss.nytimes.com/services/xml/rss/nyt/${category}.xml`)
        .then(response => addArticlesToHTML(response, distElmnt))
        .then(() => {

            if (btnMode === 'save') createSaveBtn(distElmnt)
            if (btnMode === 'delete') createDeleteBtn(distElmnt)

            // Takes one argument: The elements class name that you want to make swipable
            addSwipability('card-content__link')
        })
}

function addArticlesToHTML(newsArticles, distElmnt) {

    newsArticles.slice(0, 5).forEach(article => {

        const cardContent = document.createElement('div')
        cardContent.classList.add('card-content')

        const description = article["media:description"] ? article["media:description"] : article.description

        cardContent.innerHTML = `
                <a href="${article.link}" class="card-content__link">
                    <div class="card-content__img-container">
                        <img src="${article["media:content"]}" alt="" class="card-content__img">
                    </div>
                    <div class="card-content__text-container">
                        <h2 class="card-content__heading">${article.title}</h2>
                        <p class="card-content__description">${description}</p>
                    </div>
                </a>
                `
        distElmnt.append(cardContent);
    })
}
