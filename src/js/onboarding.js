const wrapper = document.querySelector('.wrapper')
// ONBOARDING COMPLETE VARIABLE
let localOnboardingComplete = JSON.parse(localStorage.getItem("onboardingCompleted"))
let onboardingComplete = localOnboardingComplete ? localOnboardingComplete : false
// ITEMS TO BE STYLE RESET
let styleRemoveItems = [];

runOnboarding()
function runOnboarding() {
    console.log('updateOnboardingSteps');
    // ONBOARDING STEP NUMBER VARIABLE
    let localOnboardingStepNum = Number(localStorage.getItem("onboardingStepNum"))
    let onboardingStepNum = localOnboardingStepNum ? localOnboardingStepNum : 0
    localStorage.setItem("onboardingStepNum", onboardingStepNum)

    if (!onboardingComplete) {
        if (!document.querySelector('.overlay')) createOnboardingBox()
        if (onboardingStepNum === 0) onboardingWelcome()
        if (onboardingStepNum === 1) onboardingDisplayArticles()

        updateBtnStatus(onboardingStepNum)
        updateDotStatus(onboardingStepNum)
    }
}
function onboardingDisplayArticles() {
    moveBoxDown("5%")
    headingText("")
    descriptionText("Click on a category to display related articles")
    const cardSection = wrapper.children[3]
    const category = cardSection.id
    const arrowIcon = cardSection.querySelector('.card-header__icon')
    cardSection.style.position = "relative"
    // cardSection.style.pointerEvents = "none"
    // arrowIcon.style.transform = "rotate(90deg)"

    // getNYTArticles(category, cardSection, 'save')
    
    cardSection.addEventListener('click', goForward)
    function goForward() {
        changeStepNum('+1')
        runOnboarding()
        cardSection.removeEventListener('click', goForward)
    }

    styleRemoveItems = [cardSection]
}
function onboardingWelcome() {
    moveBoxDown("10%")
    headingText("welcome to <br> the newsbox app")
    descriptionText("This is a short guide on how to use the app")
}
function createOnboardingBox() {
    console.log('createOnboardingBox');
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
    enableOnboardingListener()
}

function enableOnboardingListener() {
    // GLOBAL LISTENER
    document.addEventListener('click', e => {
        // BUTTONS
        if (e.target.classList.contains("prev-btn")) {
            changeStepNum('-1')
            removeStyle(styleRemoveItems)
            runOnboarding()
        }
        if (e.target.classList.contains("next-btn")) {
            changeStepNum('+1')
            removeStyle(styleRemoveItems)
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
}

function createTag(element, className) {
    const createElement = document.createElement(element)
    createElement.classList.add(className)
    return createElement
}

function updateBtnStatus(onboardingStepNum) {
    const prevBtn = document.querySelector('.prev-btn')
    const nextBtn = document.querySelector('.next-btn')

    if (onboardingStepNum === 0) prevBtn.classList.add('btn_disabled')
    // if (onboardingStepNum > 10) nextBtn.classList.add('btn_disabled')
    else {
        if (prevBtn.classList.contains('btn_disabled')) prevBtn.classList.remove('btn_disabled')
        if (nextBtn.classList.contains('btn_disabled')) nextBtn.classList.remove('btn_disabled')
    }
}

function updateDotStatus(onboardingStepNum) {
    const dotContainer = document.querySelector(".dot-container")
    const dotArray = Array.from(dotContainer.children)
    // RESET COLORED DOT
    dotArray.forEach(dot => {
        if (dot.classList.contains('dot_active')) dot.classList.remove('dot_active')
    })
    // ADD COLORED DOT
    dotArray[onboardingStepNum].classList.add('dot_active')
}
// takes one argument which can be either of two values: '+1' or '-1'
function changeStepNum(action) {
    let localOnboardingStepNum = Number(localStorage.getItem("onboardingStepNum"))

    if (action === '+1') localOnboardingStepNum++
    if (action === '-1') localOnboardingStepNum--

    localStorage.setItem("onboardingStepNum", localOnboardingStepNum)
}
function headingText(text) {
    document.querySelector(".onboarding__heading").innerHTML = text
}
function descriptionText(text) {
    document.querySelector(".onboarding__description").innerHTML = text
}
function moveBoxDown(value) {
    document.querySelector(".onboarding__box").style.top = value
}
function removeStyle(styleRemoveItems) {
    if (styleRemoveItems.length > 0) {
        styleRemoveItems.forEach(item => {
            if (item.getAttribute('style')) item.removeAttribute('style')
        })        
    }
}
