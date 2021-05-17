// Only run if on the archive.html page
if (window.location.pathname === "/archive/") {

    if (articleLS.get() && articleLS.get().length > 0) {
        const categoryArrayOrder = categoryOrder.get()
        const articlesLS = articleLS.get()

        const finalCategoryOrder = sortCategoryOrder(categoryArrayOrder, articlesLS)

        createCards(finalCategoryOrder)

        addSavedArticlesToHTML(articlesLS)

        document.querySelectorAll('section').forEach(card => createDeleteBtn(card))

        addSwipability('card-content__link')
        
        categoryBtnListener()
    }

    function addSavedArticlesToHTML(articlesLS) {
        articlesLS.forEach(article => {
            const cardContent = document.createElement('div')
            cardContent.classList.add('card-content', 'fade-in-up')
            cardContent.setAttribute('data-id', article.id)
            cardContent.style.display = "none"

            cardContent.innerHTML = `
                    <a href="${article.link}" class="card-content__link">
                        <div class="card-content__img-container">
                            <img src="${article.img}" alt="" class="card-content__img">
                        </div>
                        <div class="card-content__text-container">
                            <h2 class="card-content__heading">${article.title}</h2>
                            <p class="card-content__description">${article.description}</p>
                        </div>
                    </a>
                    `
            const distElmnt = document.querySelector(`#${article.category}`)
            distElmnt.append(cardContent);
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
                const cardSection = e.target.parentElement
                const arrowIcon = cardSection.querySelector('.card-header__icon')
                const category = cardSection.querySelector('.card-header__title').innerText
                const newsArticles = cardSection.querySelectorAll('.card-content')

                if (arrowIcon.style.transform === '') {
                    newsArticles.forEach(article => {
                        article.classList.add('fade-in-up')
                        article.style.display = "block"
                    })
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