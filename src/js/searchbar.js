const searchInput = document.querySelector('.searchbox__input')

if (searchInput) {
    searchInput.addEventListener('keyup', () => {
        if (searchInput.value.toLowerCase() === "reset") resetLS()    
    })        
} 

function resetLS() {
    localStorage.removeItem("theme")
    localStorage.removeItem("onboardingCompleted")
    localStorage.removeItem("savedArticles")
    localStorage.removeItem("deletedCategories")
    localStorage.removeItem("categoryOrder")
    location.reload();
}