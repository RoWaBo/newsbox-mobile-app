
// ==== CREATE SAVE BUTTON ====
function createSaveBtn(distElmnt) {
    const btnParents = distElmnt.querySelectorAll('.card-content');
    const backgroundColor = localStorage.getItem("theme") === "dark" ? '#43A0EF' : "#87bcbf" 

    btnParents.forEach(btnParent => {
        // CREATE BUTTON DIV
        const btn = document.createElement('div');
        btn.classList.add('swipe-btn');
        // CREATE SAVE BUTTON
        btn.innerHTML = `<i class="fas fa-inbox swipe-btn__icon"></i>`
        btnParent.style.backgroundColor = backgroundColor
        // APPLYING STYLING AND ADDING TO HTML
        const swipableElement = btnParent.children.item(0)

        swipableElement.style.position = "relative"
        swipableElement.style.zIndex = "1"
        btnParent.style.position = "relative"

        btnParent.prepend(btn)
    })

    const swipeBtns = distElmnt.querySelectorAll('.swipe-btn')
    swipeBtns.forEach(swipeBtn => {
        swipeBtn.addEventListener('click', e => {
            const cardContent = e.target.closest('.card-content')
            const category = distElmnt.querySelector('.card-header__title')

            // saveArticleToLS(category, cardContent)
            articleLS.save(category, cardContent)
            // takes one status/message argument
            addInfoBox('saved', 'Article')
        })
    })
}

// ==== CREATE DELETE BUTTON ====
function createDeleteBtn(distElmnt) {
    const btnParents = distElmnt.querySelectorAll('.card-content');

    btnParents.forEach(btnParent => {
        // CREATE BUTTON DIV
        const btn = document.createElement('div');
        btn.classList.add('swipe-btn');
        // CREATE DELETE BUTTON
        btn.innerHTML = `<i class="fas fa-trash swipe-btn__icon"></i>`
        btnParent.style.backgroundColor = "#d95454"
        // APPLYING STYLING AND ADDING TO HTML
        const swipableElement = btnParent.children.item(0)

        swipableElement.style.position = "relative"
        swipableElement.style.zIndex = "1"
        btnParent.style.position = "relative"

        btnParent.prepend(btn)
    })

    distElmnt.addEventListener('click', deleteArticleLS)
    function deleteArticleLS(e) {
        if (e.target.classList.contains("swipe-btn")) {
            const cardContent = e.target.closest('.card-content')
            const cardContentID = cardContent.getAttribute('data-id')

            slideOutRemove(cardContent)

            articleLS.delete(cardContentID)

            addInfoBox('deleted', 'Article')

            if (cardContent.parentElement.children.length === 2) {
                const card = cardContent.parentElement
                card.removeEventListener('click', deleteArticleLS)

                setTimeout(() => {
                    slideOutRemove(card)
                }, 700)

                setTimeout(() => addInfoBox('deleted', 'Emty category'), 1700)
            }
        }
    }
}