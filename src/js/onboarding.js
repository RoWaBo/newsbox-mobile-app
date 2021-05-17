
(function runOnboarding() {
    // CREATE OVERLAY
    const body = document.querySelector('body');
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    // GLOBAL LISTENER
    document.addEventListener('click', e => {
        // BUTTONS
        if (e.target.classList.contains("prev-btn")) console.log(e.target);
        if (e.target.classList.contains("next-btn")) onboardingOpenCategory();
        // DOTS
        if (e.target.classList.contains("dot")) console.log(e.target);
        // EXIT ICON
        if (e.target.classList.contains("onboarding__exit-icon")) console.log(e.target);
    })

    onboardingIntro(overlay, body)
})()

function onboardingIntro(overlay, body) {
    const onboardingSection = document.createElement('section')
    onboardingSection.classList.add('.onboarding')

    onboardingSection.innerHTML = `
        <div class="onboarding__box">
            <i class="fas fa-times onboarding__exit-icon"></i>
            <h2 class="onboarding__heading">Welcome to <br> the Newsbox app!</h2>
            <p class="onboarding__description">This is a short guide on how to use the app</p>
            <div class="onboarding__controls">
                <button class="prev-btn btn_disabled"><i class="fas fa-chevron-left"></i></button>
                <div class="dot-container">
                    <span class="dot dot_active"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
                <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>`
    overlay.append(onboardingSection);
    body.prepend(overlay);
}

function onboardingOpenCategory() {
    const body = document.querySelector('body')
    const overlay = document.querySelector('.overlay')

    overlay.innerHTML = `
    <section class="onboarding">
        <div class="onboarding__box">
            <i class="fas fa-times onboarding__exit-icon"></i>
            <p class="onboarding__description">Click on a category to view related news articles</p>
            <div class="onboarding__controls">
                <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
                <div class="dot-container">
                    <span class="dot"></span>
                    <span class="dot dot_active"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
                <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    </section>`
    body.prepend(overlay);
}





