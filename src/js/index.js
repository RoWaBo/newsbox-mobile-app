// Only run if on the index.html page
if (window.location.pathname === "/") {

    (function addAnimationToWrapper() {
        const wrapper = document.querySelector('.wrapper');
        const previousPage = document.referrer;

        if (previousPage.includes("archive")) wrapper.classList.add('slide-in-right')
        if (previousPage.includes("settings")) wrapper.classList.add('slide-in-left')
    })();

    addCardsToHTML()
    
    categoryBtnListener()

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
                        getNYTArticles(category, cardSection, 'save')
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