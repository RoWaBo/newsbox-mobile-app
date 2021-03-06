// GLOBAL VARIABLES
const body = document.querySelector('body')
const wrapper = document.querySelector('.wrapper')
let overlay;
let nextBtn;
let prevBtn;
let dotContainer;
let heading;
let description;
let onboardingBox;
// syncWithLS takes two arguments: (itemNameLS, defaultValue)
let onboardingComplete = syncWithLS("onboardingCompleted", false)

if (!onboardingComplete) runOnboarding()
function runOnboarding() {
    const onboardingStepNum = syncWithLS("onboardingStepNum", 0)
    localStorage.setItem("onboardingStepNum", onboardingStepNum)

    console.log("onboardingstep: "+onboardingStepNum);

    if (!document.querySelector('.overlay')) createOnboardingBox()
    switch (onboardingStepNum) {
        case 0: onboardingWelcome();
            break;
        case 1: onboardingDisplayArticles();
            break;
        case 2: setTimeout(onboardingSaveArticle, 200);
            break;
        case 3: onboardingArchive();
            break;
        case 4: onboardingDisplaySavedArticles();
            break;
        case 5: onboardingDeleteArticle();
            break;
        case 6: onboardingGoToSettings();
            break;
        case 7: onboardingTurnOffCategory();
            break;
        case 8: onboardingMoveCategory();
            break;
        case 9: onboardingTheme();
            break;
        case 10: onboardingEnd();
            break;
    }
    updateBtnStatus(onboardingStepNum)
    updateDotStatus(onboardingStepNum)
}

// ==== STEP 10 ====
function onboardingEnd() {
    queryTextElmnts()

    onboardingBox.classList.add('fade-in')

    // CREATING CALL TO ACTION BUTTON
    const continueBtn = document.createElement('button')
    continueBtn.classList.add('action-btn')
    continueBtn.innerText = "Continue"
    description.insertAdjacentElement('afterend', continueBtn)

    onboardingBox.style.top = "15%"
    heading.innerHTML = "you made it to the end!"
    description.innerHTML = `
    <p>You have completed the guide. <br> Thanks for taking the time to try the app!</p>`

    document.querySelector('.action-btn').addEventListener('click', step10ContinueBtn)
    function step10ContinueBtn() {
        onboardingDisabled()
    }    
}
// ==== STEP 9 ====
function onboardingTheme() {
    if (window.location.pathname === "/settings/") {
        const categoryContainer = document.querySelector('.category-container')
        const themeBtn = document.querySelector('.toggle-theme-button')
        queryTextElmnts()

        // SET ONBOARDINGBOX POSITION AND TEXT
        onboardingBox.style.top = "30%"
        heading.innerHTML = ""
        description.innerHTML = `
        <p>Change the theme by pressing the "toggle dark mode" button on the settings page.</p>`

        themeBtn.style.position = "absolute"
        themeBtn.style.bottom = "10%"
        themeBtn.style.left = "50%"
        themeBtn.style.transform = "translate(-50%, -50%)"
        themeBtn.classList.add('step9-pointer-animation')
        categoryContainer.style.opacity = "0%"

        // EVENTLISTENERS
        nextBtn.addEventListener('click', nextBtnStep9, { once: true })
        function nextBtnStep9() {
            onboardingBox.classList.add('fade-out')
            themeBtn.classList.remove('step9-pointer-animation')
            onboardingBox.classList.add('fade-out')
            localStorage.removeItem("savedArticles")
            window.location.pathname = "/"            
        }

        prevBtn.addEventListener('click', prevBtnStep9, { once: true })
        function prevBtnStep9() {
            themeBtn.classList.add('fade-out')
            setTimeout(() => themeBtn.classList.remove('fade-out'), 1000)
            themeBtn.removeAttribute('style')
            categoryContainer.style.opacity = ""

            nextBtn.removeEventListener('click', nextBtnStep9)
            themeBtn.removeEventListener('click', themeBtnStep9)
        }

        themeBtn.addEventListener('click', themeBtnStep9, { once: true })
        function themeBtnStep9() {
            toggleAllPointerEvents()
            localStorage.removeItem("savedArticles")
            themeBtn.classList.remove('step9-pointer-animation')
            overlay.style.backgroundColor = "unset"
            description.innerHTML = `<span class="text-highlight">Dark mode is on!<span> <br> Take a second to look at it.`
            setTimeout(() => {
                localStorage.removeItem("theme")
                changeStepNum('+1')
                window.location.pathname = "/"            
            }, 4000)
        }        
    } else {
        window.location.pathname = "/settings/"    
    }
}
// ==== STEP 8 ====
function onboardingMoveCategory() {
    const categoryContainer = document.querySelector('.category-container')
    let barIcons;
    let categoryContent;
    queryTextElmnts()

    // SET ONBOARDINGBOX POSITION AND TEXT
    onboardingBox.style.top = "5%"
    heading.innerHTML = ""
    description.innerHTML = `
    <p>Change the order of categories by dragging on the left icon.</p>
    <p><span class="text-highlight">Move a category now <span></p>`

    categoryContainer.style.marginTop = "25%"

    // EVENTLISTENERS
    prevBtn.addEventListener('click', prevBtnStep8, { once: true })
    function prevBtnStep8() {
        localStorage.removeItem('deletedCategories')
        categoryContent[0].classList.remove('step8-pointer-animation')
    }
    nextBtn.addEventListener('click', nextBtnStep8, { once: true })
    function nextBtnStep8() {
        prevBtn.removeEventListener('click', prevBtnStep8)
        barIcons.forEach(barIcon => barIcon.removeEventListener('click', barIconsStep8))
    }
    setTimeout(() => {
        categoryContent = categoryContainer.querySelectorAll('.category-content')
        barIcons = document.querySelectorAll('.category-content__handlebar')
        barIcons.forEach(barIcon => barIcon.addEventListener('click', barIconsStep8))
        categoryContent[0].classList.add('step8-pointer-animation')
    }, 200)
    function barIconsStep8() {
        prevBtn.removeEventListener('click', prevBtnStep8)
        nextBtn.removeEventListener('click', nextBtnStep8)
        barIcons.forEach(barIcon => barIcon.removeEventListener('click', barIconsStep8))
    }
}

// ==== STEP 7 ====
function onboardingTurnOffCategory() {
    if (window.location.pathname === "/settings/") {
        const categoryContainer = document.querySelector('.category-container')
        let toggleSwitches;
        let categoryContent;
        queryTextElmnts()

        onboardingBox.classList.add('fade-in')
        categoryContainer.classList.add('fade-in')

        // SET ONBOARDINGBOX POSITION AND TEXT
        onboardingBox.style.top = "2%"
        heading.innerHTML = "welcome to settings"
        description.innerHTML = `
        <p>Manage the categories you want to receive news from.</p>
        <p><span class="text-highlight">Press the switch to turn a category off<span></p>`

        categoryContainer.style.marginTop = "29%"

        // EVENTLISTENERS
        prevBtn.addEventListener('click', prevBtnStep7, { once: true })
        function prevBtnStep7() {
            window.location.pathname = "/archive"
        }
        nextBtn.addEventListener('click', nextBtnStep7, { once: true })
        function nextBtnStep7() {
            toggleSwitches[0].checked = false
            categoriesLS.toggle(toggleSwitches[0])

            categoryContent[0].classList.remove('step7-pointer-animation')
            prevBtn.removeEventListener('click', prevBtnStep7)
            toggleSwitches.forEach(toggleSwitch => toggleSwitch.removeEventListener('click', toggleSwitchesStep7))
        }
        setTimeout(() => {
            categoryContent = categoryContainer.querySelectorAll('.category-content')
            toggleSwitches = document.querySelectorAll('.switch__check')
            toggleSwitches.forEach(toggleSwitch => toggleSwitch.addEventListener('click', toggleSwitchesStep7))
            categoryContent[0].classList.add('step7-pointer-animation')
        }, 200)
        function toggleSwitchesStep7() {
            changeStepNum('+1')
            runOnboarding()

            categoryContent[0].classList.remove('step7-pointer-animation')
            prevBtn.removeEventListener('click', prevBtnStep7)
            nextBtn.removeEventListener('click', nextBtnStep7)
            toggleSwitches.forEach(toggleSwitch => toggleSwitch.removeEventListener('click', toggleSwitchesStep7))
        }
    } else {
        window.location.pathname = "/settings"
    }
}

// ==== STEP 6 ====
function onboardingGoToSettings() {
    if (window.location.pathname === "/archive/") {
        const topHeader = wrapper.querySelector('.top-header')
        const settingsBtn = topHeader.querySelector('.navigation-menu').lastElementChild
        const gearIcon = settingsBtn.firstElementChild
        queryTextElmnts()
        
        gearIcon.style.position = "relative"
        gearIcon.classList.add('step6-pointer-animation')
        topHeader.style.position = "relative"

        // SET ONBOARDINGBOX POSITION AND TEXT
        onboardingBox.style.top = "15%"
        description.innerHTML = `
        <p><span class="text-highlight">The article is now deleted!</span></p>
        <p>Go to the settings page by pressing the right icon above.</p>`

        // EVENTLISTENERS
        nextBtn.addEventListener('click', nextBtnStep6, { once: true })
        function nextBtnStep6() {
            window.location.pathname = "/settings"

            prevBtn.removeEventListener('click', prevBtnStep6)
            settingsBtn.removeEventListener('click', archiveIconStep6)
        }

        prevBtn.addEventListener('click', prevBtnStep6, { once: true })
        function prevBtnStep6() {
            topHeader.style.position = ""
            gearIcon.classList.remove('step6-pointer-animation') 
            location.reload()
            nextBtn.removeEventListener('click', nextBtnStep6)
            settingsBtn.removeEventListener('click', archiveIconStep6)
        }

        settingsBtn.addEventListener('click', archiveIconStep6, { once: true })
        function archiveIconStep6() {
            changeStepNum('+1')
            runOnboarding()

            prevBtn.removeEventListener('click', prevBtnStep6)
            nextBtn.removeEventListener('click', nextBtnStep6)
        }
    } else {
        window.location.pathname = "/archive"
    }
}
// ==== STEP 5 ====
function onboardingDeleteArticle() {
    if (window.location.pathname === "/archive/") {
        const cardSection = wrapper.children[2]
        let deleteBtns;
        let cardContent;
        let swipeIcon;
        queryTextElmnts()

        if (cardSection) {
            // MAKES CARDSECTION MOVE ABOVE OVERLAY
            cardSection.style.position = "relative"
            cardSection.style.top = "13%"

            openCategory(cardSection)

            // SET ONBOARDINGBOX POSITION AND TEXT
            onboardingBox.style.top = "2.5%"
            heading.innerHTML = ""
            description.innerHTML = `
            <p>Delete article by swiping left and pressing the appearing icon.</p>`

            // EVENTLISTENERS
            // swiper pointer animations
            setTimeout(() => {
                cardContent = document.querySelector('.card-content')
                swipeIcon = document.querySelector('.swipe-btn__icon')
                cardContent.classList.add("swipe-pointer-animation")
                cardContent.addEventListener('touchmove', removeSwiperAnimationStep5)     
            }, 500)    
            function removeSwiperAnimationStep5() {
                cardContent.classList.remove("swipe-pointer-animation")
                swipeIcon.classList.add("swipebtn-pointer-animation")    
            } 

            prevBtn.addEventListener('click', prevBtnStep5, { once: true })
            function prevBtnStep5() {
                cardContent.classList.remove("swipe-pointer-animation")
                nextBtn.removeEventListener('click', nextBtnStep5)
            }

            nextBtn.addEventListener('click', nextBtnStep5, { once: true })
            function nextBtnStep5() {
                const cardContent = cardSection.querySelector('.card-content')
                const cardContentID = cardContent.getAttribute('data-id')

                cardSection.style.position = ""
                closeCategory(cardSection)
                articleLS.delete(cardContentID)
            }

            setTimeout(() => {
                deleteBtns = cardSection.querySelectorAll('.swipe-btn')
                deleteBtns.forEach(deleteBtn => deleteBtn.addEventListener('click', deleteBtnStep2))
            }, 200)
            function deleteBtnStep2() {
                toggleAllPointerEvents()
                setTimeout(() => {
                    closeCategory(cardSection)
                    cardSection.style.position = ""          
                }, 1300)        
                setTimeout(() => {
                    prevBtn.removeEventListener('click', prevBtnStep5)
                    nextBtn.removeEventListener('click', nextBtnStep5)
                    deleteBtns.forEach(deleteBtn => deleteBtn.removeEventListener('click', deleteBtnStep2))
                    toggleAllPointerEvents()
                    changeStepNum('+1')
                    runOnboarding()
                }, 2000)
            }
        }
        else {
            // If no article is saved - jump back to where you save article
            localStorage.setItem("onboardingStepNum", 2)
            window.location.pathname = "/"
        }
    }
    else {
        window.location.pathname = "/archive/"
    }
}

// ==== STEP 4 ====
function onboardingDisplaySavedArticles() {
    const cardSection = wrapper.children[2]
    const arrowIcon = nextBtn.firstElementChild
    queryTextElmnts()

    onboardingBox.classList.add('fade-in')
    cardSection.classList.add('fade-in')

    // MAKES CARDSECTION MOVE ABOVE OVERLAY
    cardSection.style.position = "relative"
    cardSection.style.top = "13%"

    setTimeout(() => openCategory(cardSection), 300)    

    arrowIcon.style.position = "relative"
    arrowIcon.classList.add('nextbtn-pointer-animation')

    cardSection.style.pointerEvents = "none";

    // SET ONBOARDINGBOX POSITION AND TEXT
    onboardingBox.style.top = "2.5%"
    heading.innerHTML = "welcome to the archive"
    description.innerHTML = `
    <p>Read your saved articles here.</p>
    <p><span class="text-highlight">Press button to continue</span></p>`

    // EVENTLISTENERS
    nextBtn.addEventListener('click', nextBtnStep4, { once: true })
    function nextBtnStep4() {
        cardSection.style.pointerEvents = "";
        arrowIcon.classList.remove('nextbtn-pointer-animation')
        arrowIcon.style.position = ""

        prevBtn.removeEventListener('click', prevBtnStep4)
    }
    prevBtn.addEventListener('click', prevBtnStep4, { once: true })
    function prevBtnStep4() {
        window.location.pathname = "/"
    }
}
// ==== STEP 3 ====
function onboardingArchive() {
    if (window.location.pathname === "/") {
        const cardSection = wrapper.children[3]
        const topHeader = wrapper.querySelector('.top-header')
        const archiveBtn = topHeader.querySelector('.navigation-menu').firstElementChild
        const archiveIcon = archiveBtn.firstElementChild
        queryTextElmnts()

        archiveIcon.classList.add('nav-pointer-animation')
        cardSection.style.position = ""
        topHeader.style.position = "relative"

        // SET ONBOARDINGBOX POSITION AND TEXT
        onboardingBox.style.top = "15%"
        description.innerHTML = `
        <p><span class="text-highlight">The article is now saved!</span></p>
        <p>Saved Articles can be viewed on the archive page.</p>
        <p><span class="text-highlight">Press the left icon above to go to the archive page.<span></p>`

        closeCategory(cardSection)

        // EVENTLISTENERS
        nextBtn.addEventListener('click', nextBtnStep3, { once: true })
        function nextBtnStep3() {
            archiveIcon.classList.remove('nav-pointer-animation')
            topHeader.classList.add('fade-out')
            onboardingBox.classList.add('fade-out')
            wrapper.children[2].classList.add('fade-out')
            window.location.pathname = "/archive"

            prevBtn.removeEventListener('click', prevBtnStep3)
            archiveBtn.removeEventListener('click', archiveIconStep3)
        }

        prevBtn.addEventListener('click', prevBtnStep3, { once: true })
        function prevBtnStep3() {
            topHeader.style.position = ""
            archiveIcon.classList.remove('nav-pointer-animation')
            localStorage.removeItem("savedArticles") 
            notificationCounter()

            nextBtn.removeEventListener('click', nextBtnStep3)
            archiveBtn.removeEventListener('click', archiveIconStep3)
        }

        archiveBtn.addEventListener('click', archiveIconStep3, { once: true })
        function archiveIconStep3() {
            archiveIcon.classList.remove('nav-pointer-animation')
            topHeader.classList.add('fade-out')
            onboardingBox.classList.add('fade-out')
            wrapper.children[2].classList.add('fade-out')
            changeStepNum('+1')
            runOnboarding()

            prevBtn.removeEventListener('click', prevBtnStep3)
            nextBtn.removeEventListener('click', nextBtnStep3)
        }
    }
    else {
        window.location.pathname = "/"
    }
}

// ==== STEP 2 ====
function onboardingSaveArticle() {
    const cardSection = wrapper.children[3]
    let cardContent;
    let saveBtns;
    let swipeIcon;
    setTimeout(() => fetchCategory(cardSection), 300)
    queryTextElmnts()

    // MAKES CARDSECTION MOVE ABOVE OVERLAY
    cardSection.style.position = "relative"

    // SET ONBOARDINGBOX POSITION AND TEXT
    onboardingBox.style.top = "2.5%"
    description.innerHTML = `
    <p>Save article by swiping left and pressing the appearing icon.</p>
    <p><span class="text-highlight">Swipe and save it now!<span></p>`

    // EVENTLISTENERS
    // swiper pointer animations
    setTimeout(() => {
        cardContent = document.querySelector('.card-content')
        swipeIcon = document.querySelector('.swipe-btn__icon')
        cardContent.classList.add("swipe-pointer-animation")
        cardContent.addEventListener('touchmove', removeSwiperAnimationStep2)     
    }, 700)    
    function removeSwiperAnimationStep2() {
        cardContent.classList.remove("swipe-pointer-animation")
        swipeIcon.classList.add("swipebtn-pointer-animation")    
    } 

    prevBtn.addEventListener('click', prevBtnStep2, { once: true })
    function prevBtnStep2() {
        closeCategory(cardSection)
        nextBtn.removeEventListener('click', nextBtnStep2)
    }

    nextBtn.addEventListener('click', nextBtnStep2, { once: true })
    function nextBtnStep2() {
        const cardContent = cardSection.querySelector('.card-content')
        const category = cardSection.id

        articleLS.save(category, cardContent)
        notificationCounter()

        prevBtn.removeEventListener('click', prevBtnStep2)
    }

    setTimeout(() => {
        saveBtns = cardSection.querySelectorAll('.swipe-btn')
        saveBtns.forEach(saveBtn => saveBtn.addEventListener('click', saveBtnStep2))
    }, 800)
    function saveBtnStep2() {
        toggleAllPointerEvents()
        setTimeout(() => {
            prevBtn.removeEventListener('click', prevBtnStep2)
            nextBtn.removeEventListener('click', nextBtnStep2)
            saveBtns.forEach(saveBtn => saveBtn.removeEventListener('click', saveBtnStep2))
            toggleAllPointerEvents()
            changeStepNum('+1')
            runOnboarding()
        }, 2000)
    }
}

// ==== STEP 1 ====
function onboardingDisplayArticles() {
    const cardSection = wrapper.children[3]
    queryTextElmnts()

    // MAKES CARDSECTION MOVE ABOVE OVERLAY
    cardSection.style.position = "relative"

    // SET ONBOARDINGBOX POSITION AND TEXT
    onboardingBox.style.top = "2.5%"
    heading.innerHTML = ""
    description.innerHTML = `
    <p>Press the category box below to view related articles.</p> <p><span class="text-highlight">Try it now!<span></p>`

    setTimeout(() => {
        cardSection.classList.add('hand-pointer-animation')        
    }, 300)

    // EVENTLISTENERS
    nextBtn.addEventListener('click', nextBtnStep1, { once: true })
    function nextBtnStep1() {
        cardSection.classList.remove('hand-pointer-animation')
        prevBtn.removeEventListener('click', prevBtnStep1)
        cardSection.removeEventListener('click', cardSectionStep1)
    }
    prevBtn.addEventListener('click', prevBtnStep1, { once: true })
    function prevBtnStep1() {
        cardSection.classList.remove('hand-pointer-animation')
        cardSection.removeAttribute('style')
        nextBtn.removeEventListener('click', nextBtnStep1)
        cardSection.removeEventListener('click', cardSectionStep1)
    }
    cardSection.addEventListener('click', cardSectionStep1, { once: true })
    function cardSectionStep1() {
        cardSection.classList.remove('hand-pointer-animation')
        changeStepNum('+1')
        runOnboarding()
        prevBtn.removeEventListener('click', prevBtnStep1)
        nextBtn.removeEventListener('click', nextBtnStep1)
    }
}

// ==== STEP 0 ====
function onboardingWelcome() {
    if (window.location.pathname === "/") {
        nextStepAnimation(overlay)
        queryTextElmnts()
        onboardingBox.style.top = "15%"
        heading.innerHTML = "welcome to <br> the newsbox app"
        description.innerHTML = `
        <p>This is a detailed guide on how to use the app.</p> 
        <p><span class="text-highlight">It's possible to interact with the upcoming examples. <br> Follow the hand gestures.<span></p>`
    }
    else {
        window.location.pathname = "/"
    }
}
function createOnboardingBox() {
    console.log('createOnboardingBox');
    // DISABLE SCROLLING
    wrapper.style.overflowY = "hidden"
    // CREATE OVERLAY
    const body = document.querySelector('body');
    const overlay = createTag('div', 'overlay')
    // CREATE ONBOARDING BOX
    const onboardingBox = createTag('div', 'onboarding__box')
    onboardingBox.innerHTML = `
    <i class="fas fa-times onboarding__exit-icon"></i>
    <h2 class="onboarding__heading"></h2>
    <div class="onboarding__description"></div>
    <div class="onboarding__controls">
        <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
        <div class="dot-container">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>
        <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
    </div>`
    body.prepend(overlay);
    overlay.prepend(onboardingBox)
    enableOnboardingListener(onboardingBox)
}
function enableOnboardingListener(onboardingBox) {
    overlay = document.querySelector('.overlay')
    nextBtn = document.querySelector('.next-btn')
    prevBtn = document.querySelector('.prev-btn')
    dotContainer = document.querySelector(".dot-container")
    heading = document.querySelector(".onboarding__heading")
    description = document.querySelector(".onboarding__description")
    onboardingBox = document.querySelector(".onboarding__box")

    // LISTENER
    onboardingBox.addEventListener('click', e => {
        // BUTTONS
        if (e.target.classList.contains("prev-btn")) {
            changeStepNum('-1')
            runOnboarding()
        }
        if (e.target.classList.contains("next-btn")) {
            changeStepNum('+1')
            runOnboarding()
        }
        // EXIT ICON
        if (e.target.classList.contains("onboarding__exit-icon")) onboardingDisabled();
    })
}

// ==== ONBOARDING HELPER FUNCTIONS ====
function onboardingDisabled() {
    overlay.classList.add('fade-out')
    setTimeout(() => {
        localStorage.setItem("onboardingCompleted", true)
        localStorage.removeItem("onboardingStepNum")
        document.querySelector('.overlay').remove()
        // ENABLE SCROLLING
        wrapper.removeAttribute('style')
        localStorage.removeItem("savedArticles")
        localStorage.removeItem("deletedCategories")
        localStorage.removeItem("categoryOrder")
        window.location.pathname = "/"        
    }, 550)
}
function createTag(element, className) {
    const createElement = document.createElement(element)
    createElement.classList.add(className)
    return createElement
}
function updateBtnStatus(onboardingStepNum) {
    if (onboardingStepNum === 0) prevBtn.classList.add('btn_disabled')
    else if (onboardingStepNum === dotContainer.children.length-1) nextBtn.classList.add('btn_disabled')
    else {
        if (prevBtn.classList.contains('btn_disabled')) prevBtn.classList.remove('btn_disabled')
        if (nextBtn.classList.contains('btn_disabled')) nextBtn.classList.remove('btn_disabled')
    }
}
function updateDotStatus(onboardingStepNum) {
    const dotsCollection = dotContainer.children
    // RESET COLORED DOT
    for (let i = 0; i < dotsCollection.length - 1; i++) {
        if (dotsCollection[i].classList.contains('dot_active')) dotsCollection[i].classList.remove('dot_active')
    }
    // ADD COLORED DOT
    dotsCollection[onboardingStepNum].classList.add('dot_active')
}
// takes one argument which can be either of two values: '+1' or '-1'
function changeStepNum(action) {
    let localOnboardingStepNum = Number(localStorage.getItem("onboardingStepNum"))

    if (action === '+1') localOnboardingStepNum++
    if (action === '-1') localOnboardingStepNum--

    localStorage.setItem("onboardingStepNum", localOnboardingStepNum)
}
function queryTextElmnts() {
    heading = document.querySelector(".onboarding__heading")
    description = document.querySelector(".onboarding__description")
    onboardingBox = document.querySelector(".onboarding__box")
    nextStepAnimation([heading, description])
}
function fetchCategory(cardSection) {
    const category = cardSection.id
    const arrowIcon = cardSection.querySelector('.card-header__icon')

    arrowIcon.style.transform = "rotate(90deg)"
    if (cardSection.children.length == 1) getNYTArticles(category, cardSection, 'save')
}
function openCategory(cardSection) {
    const arrowIcon = cardSection.querySelector('.card-header__icon')
    const cardContentAll = cardSection.querySelectorAll('.card-content')
    
    cardContentAll.forEach(article => {
        article.classList.add('fade-in-up')
        article.style.display = "block"
    })
    arrowIcon.style.transform = "rotate(90deg)"
}
function closeCategory(cardSection) {
    const arrowIcon = cardSection.querySelector('.card-header__icon')
    const cardContentAll = cardSection.querySelectorAll('.card-content')
     
    if (arrowIcon) arrowIcon.style.transform = ''
    if (cardContentAll) cardContentAll.forEach(cardContent => slideOutRemove(cardContent))        
}
function toggleAllPointerEvents() {
    body.classList.contains('disablePointerEvents')
        ? body.classList.remove('disablePointerEvents') 
        : body.classList.add('disablePointerEvents')
}