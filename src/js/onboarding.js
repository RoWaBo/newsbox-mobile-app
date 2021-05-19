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
// ITEMS TO BE STYLE RESET
let itemsStyleRemove = [];

if (!onboardingComplete) runOnboarding()

function runOnboarding() {
    let onboardingStepNum = syncWithLS("onboardingStepNum", 0)
    localStorage.setItem("onboardingStepNum", onboardingStepNum)

    if (!document.querySelector('.overlay')) createOnboardingBox()
    switch (onboardingStepNum) {
        case 0: onboardingWelcome();
            break;
        case 1: onboardingDisplayArticles();
            break;
        case 2: setTimeout(onboardingSaveArticle, 200);
            break;
    }

    updateBtnStatus(onboardingStepNum)
    updateDotStatus(onboardingStepNum)
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
    description.innerHTML = `Save articles by swiping left and clicking the appearing icon <br> <span class="text-highlight">Try it now!<span>`

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
        
        articleLS.save(category, cardContent)
        
        prevBtn.removeEventListener('click', prevBtnStep2)
        saveBtns.forEach(saveBtn => saveBtn.removeEventListener('click', saveBtnStep2))
    }
    
    setTimeout(() => {
        saveBtns = cardSection.querySelectorAll('.swipe-btn')
        saveBtns.forEach(saveBtn => saveBtn.addEventListener('click', saveBtnStep2))    
    }, 200) 
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
    description.innerHTML = "Click on a category to display related articles"

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
    queryTextElmnts()
    onboardingBox.style.top = "15%"
    heading.innerHTML = "welcome to <br> the newsbox app"
    description.innerHTML = "This is a short guide on how to use the app"
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
// function removeStyle(itemsStyleRemove) {
//     if (itemsStyleRemove.length > 0) {
//         itemsStyleRemove.forEach(item => {
//             if (item.getAttribute('style')) item.removeAttribute('style')
//         })
//     }
// }
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