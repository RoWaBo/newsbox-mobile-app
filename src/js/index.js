// Only run if on the index.html page
if (window.location.pathname === "/") {

    // WRAPPER ANIMATION
    if (localStorage.getItem("onboardingCompleted")) {
        const wrapper = document.querySelector('.wrapper');
        const previousPage = document.referrer;
    
        if (previousPage.includes("archive")) wrapper.classList.add('slide-in-right')
        if (previousPage.includes("settings")) wrapper.classList.add('slide-in-left')
    }

    addCardsToHTML()
    
    categoryBtnListener()

    notificationCounter()

    function categoryBtnListener() {
        document.addEventListener('click', e => {
            // CARD HEADER ARROW BTNS
            if (e.target.classList.contains("toggleContent")) {
                const cardSection = e.target.parentElement
                const arrowIcon = cardSection.querySelector('.card-header__icon')
                const category = cardSection.querySelector('.card-header__title').innerText
                const newsArticles = cardSection.querySelectorAll('.card-content')

                if (cardSection.children.length == 1) {
                    getNYTArticles(category, cardSection, 'save')
                    arrowIcon.style.transform = "rotate(90deg)"
                } else {
                    arrowIcon.style.transform = ''
                    newsArticles.forEach(article => slideOutRemove(article))
                }
            }
        })
    }
}