// Only run if on the archive.html page
if (window.location.pathname === "/archive/") {

    if (articleLS.get()) {
        const categoryArrayOrder = categoryOrder.get()
        const articlesLS = articleLS.get()

        const finalCategoryOrder = sortCategoryOrder(categoryArrayOrder, articlesLS)
        createCards(finalCategoryOrder)
        addSavedArticlesToHTML(articlesLS)

        categoryBtnListener()
    }

    function addSavedArticlesToHTML(articlesLS) {
        articlesLS.forEach(article => {
            
        })
    }

    function sortCategoryOrder(categoryArrayOrder, articlesLS) {
        let articleLSCatories = []
        let finalCategoryOrder = []

        // create array of saved categories from LS 
        articlesLS.forEach(article => {
            if (!articleLSCatories.includes(article.category)) {
                articleLSCatories.push(article.category)
            }
        })
        // sort the saved categories to match user selected order
        categoryArrayOrder.forEach(category => {
            if (articleLSCatories.includes(category)) {
                finalCategoryOrder.push(category)
            }
        })
        return finalCategoryOrder
    }

    function categoryBtnListener() {
        document.addEventListener('click', e => {
            // CARD HEADER ARROW BTNS
            if (e.target.classList.contains("toggleContent")) {
                const cardSection = e.target.parentElement.parentElement
                const arrowIcon = e.target.children[0]
                const category = cardSection.querySelector('.card-header__title').innerText
                const newsArticles = cardSection.querySelectorAll('.card-content')

                if (arrowIcon.style.transform === '') {
                    if (cardSection.children.length == 1) {
                        getNYTArticles(category, cardSection, 'delete')
                    }
                    else {
                        newsArticles.forEach(article => {
                            article.classList.add('fade-in-up')
                            article.style.display = "block"
                        })
                    }
                    arrowIcon.style.transform = "rotate(90deg)"
                } else {
                    arrowIcon.style.transform = ''
                    newsArticles.forEach(article => {
                        article.classList.remove('fade-in-up')
                        article.classList.add('fade-out-down')
                        setTimeout(() => {
                            article.style.display = "none"
                            article.classList.remove('fade-out-down')
                        }, 350)
                    })
                }
            }
        })
    }
}