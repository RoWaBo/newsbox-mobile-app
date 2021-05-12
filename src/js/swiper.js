
function createSaveBtn(distElmnt) {
    const btnParents = distElmnt.querySelectorAll('.card-content');

    btnParents.forEach(btnParent => {
        // CREATE BUTTON DIV
        const btn = document.createElement('div');
        btn.classList.add('swipe-btn');
        // CREATE SAVE BUTTON
        btn.innerHTML = `<i class="fas fa-inbox swipe-btn__icon"></i>`
        btnParent.style.backgroundColor = "#87bcbf"
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
            console.log('save news item');

            // saveArticleToLS(category, cardContent)
            articleLS.save(category, cardContent)
            // takes one status/message argument
            addInfoBox('saved', 'Article')
        })
    })
}

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

                setTimeout(() => addInfoBox('deleted', 'Emty category'), 1600)
            }
        }
    }
}

function slideOutRemove(element) {
    element.classList.add('animate-slow')
    element.style.height = (element.clientHeight - 1) + 'px'
    element.style.left = 0
    element.style.left = window.innerWidth + 'px'

    setTimeout(() => {
        element.style.height = 0
        // Removes all children in the parent element
        element.replaceChildren()
    }, 400)

    setTimeout(() => element.remove(), 1000)
}

// ==== ENABLE SWIPABILITY ON ELEMENT ====
function addSwipability(className) {
    let startX;
    let currentX;
    let movedX;
    let swipeElmnt;
    let viewportWidth;
    let swipeElmntX;
    let swipeLockX;
    let saveIcon;
    let deadZoneX;

    // TOUCH FUNCTIONS
    function touchStart(e) {
        swipeElmnt = e.target
        viewportWidth = e.srcElement.clientWidth
        startX = e.touches[0].clientX
        swipeElmntX = Math.round(pixelStringToNumber())
        swipeLockX = Math.round(viewportWidth * 0.3)
        deadZoneX = viewportWidth * 0.05

        // If swiper is in locked position then begin swipe from that position
        if (swipeElmntX === swipeLockX) startX = startX + swipeElmntX
    }
    function touchMove(e) {
        swipeElmntX = pixelStringToNumber()
        currentX = e.touches[0].clientX
        movedX = startX - currentX

        saveIcon = e.target.previousElementSibling.children[0]
        saveIcon.style.transform = `scale(${0.4 + (swipeElmntX / 200)})`

        if (swipeElmnt.classList.contains('animate')) swipeElmnt.classList.remove('animate')

        if (movedX > deadZoneX) swipeElmnt.style.right = movedX + "px"
        if (swipeElmntX != 0 && movedX >= 0) swipeElmnt.style.right = movedX + "px"
    }
    function touchEnd(e) {
        swipeElmnt.classList.add('animate')

        saveIcon.style.transform = `scale(1.3)`

        movedX > swipeLockX ? swipeElmnt.style.right = swipeLockX + "px" : swipeElmnt.style.right = 0
    }
    function pixelStringToNumber() {
        return Number(swipeElmnt.style.right.replace('px', ''))
    }
    // EVENTLISTENERS
    document.addEventListener('touchstart', e => {
        if (e.target.classList.contains(className)) touchStart(e)
    })
    document.addEventListener('touchmove', e => {
        if (e.target.classList.contains(className)) touchMove(e)
    })
    document.addEventListener('touchend', e => {
        if (e.target.classList.contains(className)) touchEnd(e)
    })
    document.addEventListener('click', e => {
        if (!e.target.classList.contains(className)) {
            const swipeElmnts = document.querySelectorAll(`.${className}`);

            swipeElmnts.forEach(swipeElmnt => {
                if (!swipeElmnt.classList.contains('animate')) {
                    swipeElmnt.classList.add('animate')
                }
                swipeElmnt.style.right = 0
            })
        }
    })
}