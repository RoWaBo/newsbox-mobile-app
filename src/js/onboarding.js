// GLOBAL VARIABLES
const wrapper = document.querySelector('.wrapper')
let nextBtn;
let prevBtn;
let dotContainer;
let heading;
let description;
let onboardingBox;
// ONBOARDING COMPLETE VARIABLE
let localOnboardingComplete = JSON.parse(localStorage.getItem("onboardingCompleted"))
let onboardingComplete = localOnboardingComplete ? localOnboardingComplete : false
// ITEMS TO BE STYLE RESET
let itemsStyleRemove = [];

runOnboarding()
function runOnboarding() {
    // ONBOARDING STEP NUMBER VARIABLE
    let localOnboardingStepNum = Number(localStorage.getItem("onboardingStepNum"))
    let onboardingStepNum = localOnboardingStepNum ? localOnboardingStepNum : 0
    localStorage.setItem("onboardingStepNum", onboardingStepNum)

    if (!onboardingComplete) {
        if (!document.querySelector('.overlay')) createOnboardingBox()
        if (onboardingStepNum === 0) onboardingWelcome()
        if (onboardingStepNum === 1) onboardingDisplayArticles()
        if (onboardingStepNum === 2) setTimeout(onboardingSaveArticle, 200)

        updateBtnStatus(onboardingStepNum)
        updateDotStatus(onboardingStepNum)
    }

}
// ==== STEP 2 ====
function onboardingSaveArticle() {
    const cardSection = wrapper.children[3]
    queryTextElmnts()

    // MAKES CARDSECTION MOVE ABOVE OVERLAY
    cardSection.style.position = "relative"

    // SET ONBOARDINGBOX POSITION AND TEXT
    onboardingBox.style.top = "2.5%"
    description.innerHTML = `Save articles by swiping left and clicking the appearing icon <br> <span class="text-highlight">Try it now!<span>`

    openCategory(cardSection)

    // EVENTLISTENERS
    prevBtn.addEventListener('click', () => {
        closeCategory(cardSection)
    }, { once: true })
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
    nextBtn = document.querySelector('.next-btn')
    prevBtn = document.querySelector('.prev-btn')
    dotContainer = document.querySelector(".dot-container")
    heading = document.querySelector(".onboarding__heading")
    description = document.querySelector(".onboarding__description")
    onboardingBox = document.querySelector(".onboarding__box")

    // GLOBAL LISTENER
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
        if (e.target.classList.contains("dot")) console.log(e.target);
        // EXIT ICON
        if (e.target.classList.contains("onboarding__exit-icon")) onboardingDisabled();
    })
}

function onboardingDisabled() {
    localStorage.setItem("onboardingCompleted", true)
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