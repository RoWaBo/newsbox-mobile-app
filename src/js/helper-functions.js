
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

// Can take a single element or an array of elements
function nextStepAnimation(elmntsToAnimate) {
    if (elmntsToAnimate.length) {
        const elmntsArray = elmntsToAnimate
        elmntsArray.forEach(elmnt => elmnt.classList.add('fade-in'))
        setTimeout(() => {
            elmntsArray.forEach(elmnt => elmnt.classList.remove('fade-in'))
        }, 1050)          
    } else {
        elmntsToAnimate.classList.add('fade-in')
        setTimeout(() => elmntsToAnimate.classList.remove('fade-in'), 1050)    
    }
}