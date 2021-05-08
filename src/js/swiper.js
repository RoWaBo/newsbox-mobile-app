
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
    let saveIcon;
    let deadZoneX; 

    // TOUCH FUNCTIONS
    function touchStart(e) {
        swipeElmnt = e.target
        viewportWidth = e.srcElement.clientWidth
        startX = e.touches[0].clientX
        swipeElmntX = pixelStringToNumber()
        swipeLockX = viewportWidth * 0.3
        deadZoneX = viewportWidth * 0.05

        // If swiper is in locked position then begin swipe from that position
        if (Math.round(swipeElmntX) === Math.round(swipeLockX)) startX = startX + swipeElmntX
    }
    function touchMove(e) {
        swipeElmntX = pixelStringToNumber()
        currentX = e.touches[0].clientX
        movedX = startX - currentX

        saveIcon = e.target.previousElementSibling.children[0]        
        saveIcon.style.transform = `scale(${ 0.4 + (swipeElmntX / 200)})`

        if (swipeElmnt.classList.contains('animate')) swipeElmnt.classList.remove('animate')

        if (movedX > deadZoneX) swipeElmnt.style.right = movedX + "px"
        if (swipeElmntX != 0 && movedX >= 0) swipeElmnt.style.right = movedX + "px" 
    }
    function touchEnd(e) {
        swipeElmnt.classList.add('animate')

        saveIcon.style.transform = `scale(1.3)`

        movedX > viewportWidth * 0.1 ? swipeElmnt.style.right = swipeLockX + "px" : swipeElmnt.style.right = 0
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