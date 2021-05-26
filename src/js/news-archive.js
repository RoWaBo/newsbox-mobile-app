// Only run if on the archive.html page
if (window.location.pathname === "/archive/") {

    // WRAPPER ANIMATION
    if (localStorage.getItem("onboardingCompleted")) document.querySelector('.wrapper').classList.add('slide-in-left')

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

    function categoryBtnListener() {
        document.addEventListener('click', e => {
            // CARD HEADER ARROW BTNS
            if (e.target.classList.contains("toggleContent")) {
                const cardSection = e.target.parentElement
                const arrowIcon = cardSection.querySelector('.card-header__icon')
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