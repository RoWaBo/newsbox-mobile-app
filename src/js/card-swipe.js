
console.log('card-swipe.js loaded');

const cardContent = document.querySelector('.card-content');

if (cardContent) {

    document.addEventListener('click', e => {

        if (e.target.classList.contains("card-content__btn")) {
            const parent = e.target.parentElement

            if (parent.classList.contains('create-save-btn')) {
                console.log('save news item');
            } 
            else if (parent.classList.contains('create-delete-btn')) {
                console.log('delete news item');    
            }
        }
    })
}

// ==== CREATE DELETE/SAVE SWIPE BUTTON
(function createSwipeBtn() {
    const saveBtnParent = document.querySelectorAll('.create-save-btn');
    const deleteBtnParent = document.querySelectorAll('.create-delete-btn');

    if (saveBtnParent) saveBtnParent.forEach(parent => createSaveBtn(parent))
    function createSaveBtn(parent) {
        const btn = document.createElement('div');
        btn.classList.add('card-content__btn');
        btn.innerHTML = `
            <i class="fas fa-inbox card-content__btn-icon"></i>
            `
        parent.prepend(btn)
        parent.style.position = "relative"
        parent.style.backgroundColor = "#87bcbf"
    }
    if (deleteBtnParent) deleteBtnParent.forEach(parent => createDeleteBtn(parent))
    function createDeleteBtn(parent) {
        const btn = document.createElement('div');
        btn.classList.add('card-content__btn');
        btn.innerHTML = `
            <i class="fas fa-trash card-content__btn-icon"></i>
            `
        parent.prepend(btn)
        parent.style.position = "relative"
        parent.style.backgroundColor = "#d95454"
    }

})();