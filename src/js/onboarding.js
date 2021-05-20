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
    onboardingBox.style.top = "15%"
    heading.innerHTML = "you made it to the end!"
    description.innerHTML = "You have completed the guide. <br> Thanks for taking the time to try the my app! :)"    
}
// ==== STEP 9 ====
function onboardingTheme() {
    if (window.location.pathname === "/settings/") {
        const categoryContainer = document.querySelector('.category-container')
        const themeBtn = document.querySelector('.toggle-theme-button')
        const page = document.querySelector('html')
        queryTextElmnts()

        // SET ONBOARDINGBOX POSITION AND TEXT
        onboardingBox.style.top = "30%"
        heading.innerHTML = ""
        description.innerHTML = `Change the theme by clicking the "toggle dark mode" button`

        themeBtn.style.position = "relative"
        themeBtn.style.bottom = "25%"
        categoryContainer.style.opacity = "0%"

        // EVENTLISTENERS
        nextBtn.addEventListener('click', nextBtnStep9, { once: true })
        function nextBtnStep9() {
            window.location.pathname = "/"            
        }

        prevBtn.addEventListener('click', prevBtnStep9, { once: true })
        function prevBtnStep9() {
            themeBtn.removeAttribute('style')
            categoryContainer.style.opacity = ""

            nextBtn.removeEventListener('click', nextBtnStep9)
            themeBtn.removeEventListener('click', themeBtnStep9)
        }

        themeBtn.addEventListener('click', themeBtnStep9, { once: true })
        function themeBtnStep9() {
            toggleAllPointerEvents()
            overlay.style.backgroundColor = "unset"
            description.innerHTML = `Dark theme is on!`
            setTimeout(() => {
                localStorage.removeItem("theme")
                changeStepNum('+1')
                window.location.pathname = "/"            
            }, 3000)
        }        
    } else {
        window.location.pathname = "/settings/"    
    }
}
// ==== STEP 8 ====
function onboardingMoveCategory() {
    const categoryContainer = document.querySelector('.category-container')
    let barIcons;
    queryTextElmnts()

    // SET ONBOARDINGBOX POSITION AND TEXT
    onboardingBox.style.top = "5%"
    heading.innerHTML = ""
    description.innerHTML = `Control the order of categories by dragging on the left bar icon <br> <span class="text-highlight">Move a  category now<span>`

    categoryContainer.style.marginTop = "25%"

    // EVENTLISTENERS
    prevBtn.addEventListener('click', prevBtnStep8, { once: true })
    function prevBtnStep8() {
        localStorage.removeItem('deletedCategories')
        window.location.pathname = "/settings"
    }
    nextBtn.addEventListener('click', nextBtnStep8, { once: true })
    function nextBtnStep8() {
        prevBtn.removeEventListener('click', prevBtnStep8)
        barIcons.forEach(barIcon => barIcon.removeEventListener('click', barIconsStep8))
    }
    setTimeout(() => {
        barIcons = document.querySelectorAll('.category-content__handlebar')
        barIcons.forEach(barIcon => barIcon.addEventListener('click', barIconsStep8))
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
        queryTextElmnts()

        // SET ONBOARDINGBOX POSITION AND TEXT
        onboardingBox.style.top = "2.5%"
        heading.innerHTML = "welcome to settings"
        description.innerHTML = `Manage categories you want to display news from <br> <span class="text-highlight">Use the switch to turn a category off<span>`

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

            prevBtn.removeEventListener('click', prevBtnStep7)
            toggleSwitches.forEach(toggleSwitch => toggleSwitch.removeEventListener('click', toggleSwitchesStep7))
        }
        setTimeout(() => {
            toggleSwitches = document.querySelectorAll('.switch__check')
            toggleSwitches.forEach(toggleSwitch => toggleSwitch.addEventListener('click', toggleSwitchesStep7))
        }, 200)
        function toggleSwitchesStep7() {
            console.log('triggered');
            changeStepNum('+1')
            runOnboarding()

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

        gearIcon.classList.add('notice-me')
        topHeader.style.position = "relative"

        // SET ONBOARDINGBOX POSITION AND TEXT
        onboardingBox.style.top = "15%"
        description.innerHTML = `<span class="text-highlight">The article is now deleted!</span> <br> Go to settings by clicking the right gear icon.`

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
            removeClassIfExist(gearIcon, 'notice-me')

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
        queryTextElmnts()

        if (cardSection) {
            // MAKES CARDSECTION MOVE ABOVE OVERLAY
            cardSection.style.position = "relative"
            cardSection.style.top = "13%"

            openCategory(cardSection)

            // SET ONBOARDINGBOX POSITION AND TEXT
            onboardingBox.style.top = "2.5%"
            heading.innerHTML = ""
            description.innerHTML = `Delete article by swiping left and clicking the appearing icon <br> <span class="text-highlight">Delete it now!<span>`

            // EVENTLISTENERS
            prevBtn.addEventListener('click', prevBtnStep5, { once: true })
            function prevBtnStep5() {
                nextBtn.removeEventListener('click', nextBtnStep5)
            }

            nextBtn.addEventListener('click', nextBtnStep5, { once: true })
            function nextBtnStep5() {
                const cardContent = cardSection.querySelector('.card-content')
                const cardContentID = cardContent.getAttribute('data-id')

                articleLS.delete(cardContentID)

                window.location.pathname = "/archive"
            }

            setTimeout(() => {
                deleteBtns = cardSection.querySelectorAll('.swipe-btn')
                deleteBtns.forEach(deleteBtn => deleteBtn.addEventListener('click', deleteBtnStep2))
            }, 200)
            function deleteBtnStep2() {
                toggleAllPointerEvents()
                setTimeout(() => {
                    prevBtn.removeEventListener('click', prevBtnStep5)
                    nextBtn.removeEventListener('click', nextBtnStep5)
                    deleteBtns.forEach(deleteBtn => deleteBtn.removeEventListener('click', deleteBtnStep2))
                    toggleAllPointerEvents()
                    changeStepNum('+1')
                    runOnboarding()
                }, 3500)
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

    // MAKES CARDSECTION MOVE ABOVE OVERLAY
    cardSection.style.position = "relative"
    cardSection.style.top = "13%"

    openCategory(cardSection)

    arrowIcon.classList.add('notice-me')

    cardSection.style.pointerEvents = "none";

    // SET ONBOARDINGBOX POSITION AND TEXT
    onboardingBox.style.top = "2.5%"
    heading.innerHTML = "welcome to the archive"
    description.innerHTML = `Read your saved articles here <br> <span class="text-highlight">Click arrow button to continue</span>`

    // EVENTLISTENERS
    nextBtn.addEventListener('click', nextBtnStep4, { once: true })
    function nextBtnStep4() {
        cardSection.style.pointerEvents = "";
        removeClassIfExist(arrowIcon, 'notice-me')

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

        archiveIcon.classList.add('notice-me')
        cardSection.style.position = ""
        topHeader.style.position = "relative"

        // SET ONBOARDINGBOX POSITION AND TEXT
        onboardingBox.style.top = "15%"
        description.innerHTML = `<span class="text-highlight">The article is now saved!</span> <br> It can be viewed by clicking the left icon to view the archive page.`

        closeCategory(cardSection)

        // EVENTLISTENERS
        nextBtn.addEventListener('click', nextBtnStep3, { once: true })
        function nextBtnStep3() {
            window.location.pathname = "/archive"

            prevBtn.removeEventListener('click', prevBtnStep3)
            archiveBtn.removeEventListener('click', archiveIconStep3)
        }

        prevBtn.addEventListener('click', prevBtnStep3, { once: true })
        function prevBtnStep3() {
            topHeader.style.position = ""
            removeClassIfExist(archiveIcon, 'notice-me')

            nextBtn.removeEventListener('click', nextBtnStep3)
            archiveBtn.removeEventListener('click', archiveIconStep3)
        }

        archiveBtn.addEventListener('click', archiveIconStep3, { once: true })
        function archiveIconStep3() {
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
    let saveBtns;
    queryTextElmnts()

    // MAKES CARDSECTION MOVE ABOVE OVERLAY
    cardSection.style.position = "relative"

    // SET ONBOARDINGBOX POSITION AND TEXT
    onboardingBox.style.top = "2.5%"
    description.innerHTML = `Save article by swiping left and clicking the appearing icon <br> <span class="text-highlight">Save it now!<span>`

    openCategory(cardSection)

    // EVENTLISTENERS
    prevBtn.addEventListener('click', prevBtnStep2, { once: true })
    function prevBtnStep2() {
        closeCategory(cardSection)
        nextBtn.removeEventListener('click', nextBtnStep2)
    }

    nextBtn.addEventListener('click', nextBtnStep2, { once: true })
    function nextBtnStep2() {
        const cardContent = cardSection.querySelector('.card-content')
        const category = cardSection.id

        // addInfoBox('saved', 'Article')
        articleLS.save(category, cardContent)

        prevBtn.removeEventListener('click', prevBtnStep2)
        saveBtns.forEach(saveBtn => saveBtn.removeEventListener('click', saveBtnStep2))
    }

    setTimeout(() => {
        saveBtns = cardSection.querySelectorAll('.swipe-btn')
        saveBtns.forEach(saveBtn => saveBtn.addEventListener('click', saveBtnStep2))
    }, 500)
    function saveBtnStep2() {
        toggleAllPointerEvents()
        setTimeout(() => {
            prevBtn.removeEventListener('click', prevBtnStep2)
            nextBtn.removeEventListener('click', nextBtnStep2)
            saveBtns.forEach(saveBtn => saveBtn.removeEventListener('click', saveBtnStep2))
            toggleAllPointerEvents()
            changeStepNum('+1')
            runOnboarding()
        }, 3500)
    }
}

// ==== STEP 1 ====
function onboardingDisplayArticles() {
    const cardSection = wrapper.children[3]
    queryTextElmnts()

    // MAKES CARDSECTION MOVE ABOVE OVERLAY
    cardSection.style.position = "relative"

    // SET ONBOARDINGBOX POSITION AND TEXT
    onboardingBox.style.top = "5%"
    heading.innerHTML = ""
    description.innerHTML = "Click on the category to display related articles"

    // EVENTLISTENERS
    nextBtn.addEventListener('click', nextBtnStep1, { once: true })
    function nextBtnStep1() {
        prevBtn.removeEventListener('click', prevBtnStep1)
        cardSection.removeEventListener('click', cardSectionStep1)
    }
    prevBtn.addEventListener('click', prevBtnStep1, { once: true })
    function prevBtnStep1() {
        cardSection.removeAttribute('style')
        nextBtn.removeEventListener('click', nextBtnStep1)
        cardSection.removeEventListener('click', cardSectionStep1)
    }
    cardSection.addEventListener('click', cardSectionStep1, { once: true })
    function cardSectionStep1() {
        changeStepNum('+1')
        runOnboarding()
        prevBtn.removeEventListener('click', prevBtnStep1)
        nextBtn.removeEventListener('click', nextBtnStep1)
    }
}

// ==== STEP 0 ====
function onboardingWelcome() {
    if (window.location.pathname === "/") {
        queryTextElmnts()
        onboardingBox.style.top = "15%"
        heading.innerHTML = "welcome to <br> the newsbox app"
        description.innerHTML = "This is a short guide on how to use the app"
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
    <p class="onboarding__description"></p>
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
        // DOTS
        // if (e.target.classList.contains("dot")) console.log(e.target);
        // EXIT ICON
        if (e.target.classList.contains("onboarding__exit-icon")) onboardingDisabled();
    })
}
function onboardingDisabled() {
    localStorage.setItem("onboardingCompleted", true)
    localStorage.removeItem("onboardingStepNum")
    document.querySelector('.overlay').remove()
    // ENABLE SCROLLING
    wrapper.removeAttribute('style')
}
function createTag(element, className) {
    const createElement = document.createElement(element)
    createElement.classList.add(className)
    return createElement
}
function updateBtnStatus(onboardingStepNum) {
    if (onboardingStepNum === 0) prevBtn.classList.add('btn_disabled')
    // if (onboardingStepNum > 10) nextBtn.classList.add('btn_disabled')
    else {
        removeClassIfExist(prevBtn, 'btn_disabled')
        removeClassIfExist(nextBtn, 'btn_disabled')
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
}
function openCategory(cardSection) {
    const category = cardSection.id
    const arrowIcon = cardSection.querySelector('.card-header__icon')
    const cardContentAll = cardSection.querySelectorAll('.card-content')
    arrowIcon.style.transform = "rotate(90deg)"

    if (cardSection.children.length == 1) {
        getNYTArticles(category, cardSection, 'save')
    }
    else {
        cardContentAll.forEach(article => {
            article.classList.add('fade-in-up')
            article.style.display = "block"
        })
    }
}
function closeCategory(cardSection) {
    const arrowIcon = cardSection.querySelector('.card-header__icon')
    const cardContentAll = cardSection.querySelectorAll('.card-content')

    arrowIcon.style.transform = ''
    cardContentAll.forEach(cardContent => {
        cardContent.classList.remove('fade-in-up')
        cardContent.classList.add('fade-out-down')
        setTimeout(() => {
            cardContent.style.display = "none"
            cardContent.classList.remove('fade-out-down')
        }, 350)
    })
}
function syncWithLS(itemNameLS, defaultValue) {
    const valueLS = JSON.parse(localStorage.getItem(itemNameLS))
    const valueFinal = valueLS ? valueLS : defaultValue
    return valueFinal
}
function toggleAllPointerEvents() {
    if (body.classList.contains('disablePointerEvents')) {
        body.classList.remove('disablePointerEvents')
    }
    else {
        body.classList.add('disablePointerEvents')
    }
}
function removeClassIfExist(elmnt, className) {
    if (elmnt.classList.contains(className)) elmnt.classList.remove(className)
}