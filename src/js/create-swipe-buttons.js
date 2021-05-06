// ==== INSTRUCTIONS ====
// Place one of two classes on the parent element in HTML...
// you wish to create the btn on.
// 1) class="create-save-btn"
// 2) class="create-delete-btn"
// Remember to add the CSS classes to your stylesheet aswell

// ==== CREATE DELETE/SAVE SWIPE BUTTON ====
function createSwipeBtn() {
    const saveBtnParent = document.querySelectorAll('.create-save-btn');
    const deleteBtnParent = document.querySelectorAll('.create-delete-btn');
    let localParent;

    // CREATE BUTTON DIV
    const btn = document.createElement('div');
    btn.classList.add('swipe-btn');
    // CREATE SAVE BUTTON
    if (saveBtnParent) saveBtnParent.forEach(parent => createSaveBtn(parent))
    function createSaveBtn(parent) {
        localParent = parent
        btn.innerHTML = `<i class="fas fa-inbox swipe-btn__icon"></i>`
        localParent.style.backgroundColor = "#87bcbf"
    }
    // CREATE DELETE BUTTON
    if (deleteBtnParent) deleteBtnParent.forEach(parent => createDeleteBtn(parent))
    function createDeleteBtn(parent) {
        localParent = parent
        btn.innerHTML = `<i class="fas fa-trash swipe-btn__icon"></i>`
        localParent.style.backgroundColor = "#d95454"
    }
    // APPLYING STYLING AND ADDING TO HTML
    if (localParent) {
        const swipableElement = localParent.children.item(0)

        swipableElement.style.position = "relative"
        swipableElement.style.zIndex = "1"
        localParent.style.position = "relative"

        localParent.prepend(btn)
    } 
}
