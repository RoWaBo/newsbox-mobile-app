// Only run if on the index.html page
if (window.location.pathname === "/") {
    const card = document.querySelector('.card');

    function getNYTArticles(category, distElmnt) {
        category = category.toLowerCase()
        fetchNews(`https://rss.nytimes.com/services/xml/rss/nyt/${category}.xml`)
            .then(response => addArticlesToHTML(response, distElmnt))
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
        createSaveBtn(distElmnt)
        // Takes one argument: The elements class name that you want to make swipable
        addSwipability('card-content__link')
    }

    document.addEventListener('click', e => {
        // ARROW BTNS
        if (e.target.classList.contains("toggleContent")) {
            
            const cardSection = e.target.closest('.card')
            const arrowIcon = e.target.children[0]
            const category = cardSection.querySelector('.card-header__title').innerText
            const newsArticles = cardSection.querySelectorAll('.card-content')

            if (arrowIcon.style.transform === '') {
                if (cardSection.children.length == 1) {
                    getNYTArticles(category, cardSection)
                }
                else {
                    newsArticles.forEach(article => article.style.display = "block")
                }
                arrowIcon.style.transform = "rotate(90deg)"
            } else {
                arrowIcon.style.transform = ''
                newsArticles.forEach(article => article.style.display = "none")
            }

        }
    })
}

