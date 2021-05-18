
if (window.location.pathname === "/settings/") {

    let toggleSwitches = document.querySelectorAll('.switch__check');
    const themeBtn = document.querySelector('.toggle-theme-button');
    
    addCategoriesToHTML()

    enableDragableCategories()

    function syncSwitchStateWithLS() {
        let toggleSwitches = document.querySelectorAll('.switch__check');
        const deletedCategories = categoriesLS.get();

        toggleSwitches.forEach(toggleSwitch => {
            const categoryName = toggleSwitch.id.replace('toggle', '').toLowerCase()
            const isDeleted = deletedCategories.includes(categoryName) 
            toggleSwitch.checked = !isDeleted   
        })    
    }

    // TOGGLE THEME BUTTON
    themeBtn.addEventListener('click', e => toggleTheme("light", "dark"))
    function toggleTheme(primary, secondary) {
        const page = document.querySelector('html')

        if (page.getAttribute('data-theme') === primary) {
            page.setAttribute('data-theme', secondary)
            saveThemeToLS(secondary)
        } else {
            page.setAttribute('data-theme', primary)
            saveThemeToLS(primary)
        }
    }

    function saveCategoryOrderToLS() {
        toggleSwitches = document.querySelectorAll('.switch__check')
        let categoryNames = [];

        toggleSwitches.forEach(toggleSwitch => {
            const categoryName = toggleSwitch.id.replace('toggle', '').toLowerCase()
            categoryNames.push(categoryName)    
        })
        categoryOrder.add(categoryNames)
    }

    function addCategoriesToHTML() {
        const categoryContainer = document.querySelector('.category-container');

        categoryOrder.get().forEach(categoryName => {
            const category = document.createElement('li')
            category.classList.add('category-content')
            category.innerHTML = `
            <i class="fas fa-bars category-content__handlebar"></i>
            <h2 class="category-content__title">${categoryName}</h2>
            <label for="toggle${categoryName}" class="category-content__switch switch">
                <input type="checkbox" name="toggle${categoryName}" class="switch__check" checked="true" id="toggle${categoryName}"> 
                <span class="switch__slider switch__slider_round"></span>
            </label>       
            ` 
            categoryContainer.append(category)             
        })

        syncSwitchStateWithLS()
        // add listener on togglebuttons 
        categoryContainer.addEventListener('click', e => { if (e.target.classList.contains('switch__check')) categoriesLS.toggle(e) })
    }

    function enableDragableCategories() {
        const categoryContainer = document.querySelector('.category-container');
        const handlebars = document.querySelectorAll('.category-content__handlebar')
        new Slip(categoryContainer);

        categoryContainer.addEventListener('slip:reorder', function (e) {
            console.log('slip:reorder');

            e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
            e.target.classList.remove("category-content_active");
            saveCategoryOrderToLS()
        });
        handlebars.forEach(handlebar => {
            handlebar.addEventListener('slip:beforewait', function (e) {
                console.log('slip:beforewait');
                e.preventDefault()
                e.target.parentElement.classList.add("category-content_active");
            });            
        })
        categoryContainer.addEventListener('slip:beforeswipe', function (e) {
            console.log('slip:beforeswipe');
            e.preventDefault();
        });        
    }

}
