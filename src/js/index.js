// Only run if on the index.html page
if (window.location.pathname === "/") {

    (function addAnimationToWrapper() {
        const wrapper = document.querySelector('.wrapper');
        const previousPage = document.referrer;

        if (previousPage.includes("archive")) wrapper.classList.add('slide-in-right')
        if (previousPage.includes("settings")) wrapper.classList.add('slide-in-left')
    })();

    (function addCardToHTML() {
        const wrapper = document.querySelector('.wrapper')
        const deletedCategories = categoriesLS.get()
        const Allcategories = categoryOrder.get()

        if (deletedCategories.length === 0) {
            Allcategories.forEach(category => {
                const cardSection = document.createElement('section')
                cardSection.classList.add('.card')
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


        categoryBtnListener()
    })()

    function getCategoryLogo(categoryName) {
        if (categoryName === "europe") return "fas fa-globe-europe"
        if (categoryName === "health") return "fas fa-heartbeat"
        if (categoryName === "sports") return "fas fa-futbol"
        if (categoryName === "business") return "fas fa-briefcase"
        if (categoryName === "technology") return "fas fa-microchip"
    }

    function categoryBtnListener() {
        document.addEventListener('click', e => {
            // ARROW BTNS
            if (e.target.classList.contains("toggleContent")) {
                const cardSection = e.target.parentElement.parentElement
                const arrowIcon = e.target.children[0]
                const category = cardSection.querySelector('.card-header__title').innerText
                const newsArticles = cardSection.querySelectorAll('.card-content')
                
                if (arrowIcon.style.transform === '') {
                    if (cardSection.children.length == 1) {
                        getNYTArticles(category, cardSection, 'save')
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
}