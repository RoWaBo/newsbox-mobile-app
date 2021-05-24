
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