// Only run if on the archive.html page
if (window.location.pathname === "/archive/") {


    (function categoryBtnListener() {
        document.addEventListener('click', e => {

            // ARROW BTNS
            if (e.target.classList.contains("toggleContent")) {
                const cardSection = e.target.closest('.card')
                const arrowIcon = e.target.children[0]
                const category = cardSection.querySelector('.card-header__title').innerText
                const newsArticles = cardSection.querySelectorAll('.card-content')

                if (arrowIcon.style.transform === '') {
                    if (cardSection.children.length == 1) {
                        getNYTArticles(category, cardSection, 'delete')
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
    })();
}