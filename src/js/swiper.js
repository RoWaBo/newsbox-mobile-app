
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