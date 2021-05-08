
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

    distElmnt.addEventListener('click', e => {
        if (e.target.classList.contains("swipe-btn")) {
            const cardContent = e.target.closest('.card-content')
            const category = distElmnt.querySelector('.card-header__title')    
            console.log('save news item');
            saveArticleToLS(category, cardContent) 
        }
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

    distElmnt.addEventListener('click', e => {
        if (e.target.classList.contains("swipe-btn")) {
            const cardContent = e.target.closest('.card-content')
            const category = distElmnt.querySelector('.card-header__title')   
            console.log('delete news item');
        }
    })
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

    // TOUCH FUNCTIONS
    function touchStart(e) {
        swipeElmnt = e.target
        viewportWidth = e.srcElement.clientWidth
        startX = e.touches[0].clientX
        swipeElmntX = Number(swipeElmnt.style.right.replace('px', ''))
        swipeLockX = viewportWidth * 0.3

        // If swiper is in locked position then begin swipe from that position
        if (Math.round(swipeElmntX) === Math.round(swipeLockX)) {
            startX = startX + swipeElmntX
        }
    }
    function touchMove(e) {
        currentX = e.touches[0].clientX
        movedX = startX - currentX

        if (swipeElmnt.classList.contains('animate')) {
            swipeElmnt.classList.remove('animate')
        }
        if (movedX < - viewportWidth * 0.3) {
            swipeElmnt.classList.add('animate')
            movedX = 0
        }

        swipeElmnt.style.right = movedX + "px"
    }
    function touchEnd(e) {
        swipeElmnt.classList.add('animate')

        if (movedX > viewportWidth * 0.1) {
            swipeElmnt.style.right = swipeLockX + "px"
        }
        else {
            swipeElmnt.style.right = 0
        }
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