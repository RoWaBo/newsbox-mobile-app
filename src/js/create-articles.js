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
        cardContent.classList.add('card-content', 'fade-in-up')

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

function addCardsToHTML() {
    const deletedCategories = categoriesLS.get()
    const Allcategories = categoryOrder.get()

    if (deletedCategories.length === 0) createCards(Allcategories)

    else if (deletedCategories.length > 0) {
        const filteredCategories = Allcategories.filter(category => !deletedCategories.includes(category))
        createCards(filteredCategories)
    }
}

function createCards(categoryArray) {
    const wrapper = document.querySelector('.wrapper')

    categoryArray.forEach(category => {
        const cardSection = document.createElement('section')
        cardSection.classList.add('.card')
        cardSection.id = category
        cardSection.innerHTML = `
        <div class="card-header">
            <div class="card-header__circle">
                <i class="${getCategoryLogo(category)} card-header__logo"></i>
            </div>
            <h1 class="card-header__title">${category}</h1>
            <div class="card-header__icon-container toggleContent">
                <i class="fas fa-chevron-right card-header__icon"></i>    
            </div>
        </div>
        `
        wrapper.append(cardSection)
    })
}

function getCategoryLogo(categoryName) {
    if (categoryName === "europe") return "fas fa-globe-europe"
    if (categoryName === "health") return "fas fa-heartbeat"
    if (categoryName === "sports") return "fas fa-futbol"
    if (categoryName === "business") return "fas fa-briefcase"
    if (categoryName === "technology") return "fas fa-microchip"
}
