
const cardContent = document.querySelector('.card-content');

if (cardContent) {

    createSwipeBtn()

    document.addEventListener('click', e => {
        if (e.target.classList.contains("swipe-btn")) {
            const parent = e.target.parentElement

            if (parent.classList.contains('create-save-btn')) {
                console.log('save news item');
            }
            else if (parent.classList.contains('create-delete-btn')) {
                console.log('delete news item');
            }
        }

    })

    // Takes one argument: The elements class name that you want to make swipable
    addSwipability('card-content__link')

    function addSwipability(className) {
        let startX;
        let currentX;
        let movedX;
        let swipeElmnt;
        let viewportWidth;

        // TOUCH FUNCTIONS
        function touchStart(e) {
            swipeElmnt = e.target
            viewportWidth = window.innerWidth
            startX = e.touches[0].clientX

            // let swipeElmntPositionX = Number(swipeElmnt.style.right.replace('px', ''))            
            // if (swipeElmntPositionX != 0) {
            //     swipeElmnt.classList.add('animate')
            //     swipeElmnt.style.right = swipeElmntPositionX  
            // } 
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

            if (movedX > viewportWidth * 0.05) {
                swipeElmnt.style.right = viewportWidth * 0.3 + "px"
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
}

