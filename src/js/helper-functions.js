
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

function removeClassIfExist(elmnt, className) {
    if (elmnt.classList.contains(className)) elmnt.classList.remove(className)
}

// WRITE "ONBOARDING" IN SEARCHBAR AND ENABLE ONBOARDING
const searchInput = document.querySelector('.searchbox__input')
if (searchInput) searchInput.addEventListener('keyup', () => {
    const searchText = searchInput.value.toLowerCase()
    if (searchText === "onboarding") enableOnboarding()
    if (searchText === "reset") resetLS()    
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