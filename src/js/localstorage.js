
const articleLS = (() => {
    let localSavedArticles = JSON.parse(localStorage.getItem("savedArticles"))
    let savedArticles = localSavedArticles ? localSavedArticles : []

    function createArticleID(category) {
        const randomNumber = Math.random().toString().slice(2, 8)
        const categoryFirstLetter = category.slice(0, 1)
        return categoryFirstLetter + randomNumber
    }

    return {
        save: (category, cardContent) => {
            const linkUrl = cardContent.querySelector('.card-content__link').getAttribute('href')
            const imgSrc = cardContent.querySelector('.card-content__img').getAttribute('src')
            const heading = cardContent.querySelector('.card-content__heading').innerText
            const desc = cardContent.querySelector('.card-content__description').innerText
            category = category.innerText.toLowerCase()

            const article = {
                link: linkUrl,
                img: imgSrc,
                heading: heading,
                description: desc,
                category: category,
                id: createArticleID(category)
            }

            savedArticles.push(article)
            localStorage.setItem('savedArticles', JSON.stringify(savedArticles))
        },
        delete: (id) => {
            const articles = JSON.parse(localStorage.getItem("savedArticles"))
            const filteredArticles = articles.filter(article => article.id != id)

            localStorage.setItem('savedArticles', JSON.stringify(filteredArticles))
        },
        get: () => JSON.parse(localStorage.getItem("savedArticles"))
    }
})();



