
function syncWithLS(itemNameLS, defaultValue) {
    const valueLS = JSON.parse(localStorage.getItem(itemNameLS))
    const valueFinal = valueLS ? valueLS : defaultValue
    return valueFinal
}

function slideOutRemove(element) {
    element.classList.add('animate-slow')
    element.style.position = "relative"
    element.style.height = (element.clientHeight - 1) + 'px'
    element.style.left = 0
    element.style.left = window.innerWidth + 'px'

    setTimeout(() => {
        element.style.height = 0
        // Removes all children in the parent element
        element.replaceChildren()
    }, 400)

    setTimeout(() => element.remove(), 1000)
}

// WRITE "ONBOARDING" IN SEARCHBAR AND ENABLE ONBOARDING
const searchInput = document.querySelector('.searchbox__input')
if (searchInput) searchInput.addEventListener('keyup', () => {
    if (searchInput.value === "onboarding") enableOnboarding()
    if (searchInput.value === "reset") resetLS()    
})  
function enableOnboarding() {
    localStorage.removeItem("onboardingCompleted")
    location.reload();    
}
function resetLS() {
    localStorage.removeItem("theme")
    localStorage.removeItem("onboardingCompleted")
    localStorage.removeItem("savedArticles")
    localStorage.removeItem("deletedCategories")
    localStorage.removeItem("categoryOrder")
    location.reload();
}