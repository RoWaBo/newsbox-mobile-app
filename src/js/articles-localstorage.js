
const articleLS = (() => {
    let savedArticles = syncWithLS("savedArticles", [])
    
    function createArticleID(category) {
        const randomNumber = Math.random().toString().slice(2, 8)
        const categoryFirstLetter = category.slice(0, 1)
        return categoryFirstLetter + randomNumber
    }

    return {
        save: (category, cardContent) => {
            const linkUrl = cardContent.querySelector('.card-content__link').getAttribute('href')
            const imgSrc = cardContent.querySelector('.card-content__img').getAttribute('src')
            const title = cardContent.querySelector('.card-content__heading').innerText
            const desc = cardContent.querySelector('.card-content__description').innerText
            category = category.innerText ? category.innerText.toLowerCase() : category 

            const article = {
                link: linkUrl,
                img: imgSrc,
                title: title,
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



