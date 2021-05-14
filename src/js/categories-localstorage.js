const categoriesLS = (() => {
    return {
        toggle: e => {
            const deletedCategories = categoriesLS.get()
            const switchStatus = e.target.checked
            const categoryName = e.target.id.replace('toggle', '').toLowerCase()
    
            if (!switchStatus) deletedCategories.push(categoryName)
            else if (switchStatus) deletedCategories.splice(deletedCategories.indexOf(categoryName), 1)
    
            localStorage.setItem('deletedCategories', JSON.stringify(deletedCategories))
            
            if (deletedCategories && deletedCategories.length === 0) localStorage.removeItem('deletedCategories')   
        },
        get: () => {
            const localDeletedCategories = JSON.parse(localStorage.getItem("deletedCategories"))
            let deletedCategories = localDeletedCategories ? localDeletedCategories : []
            return deletedCategories     
        }
    }
})();

const categoryOrder = (() => {
    const defaultCategories = ["europe","health", "sports", "business", "technology"]
    // let allCategories = [];
    
    return {
        add: categoryNames => {
            // allCategories.push(categoryName)
            localStorage.setItem('categoryOrder', JSON.stringify(categoryNames))    
        },
        get: () => {
            const localCategoryOrder = JSON.parse(localStorage.getItem("categoryOrder"))
            let categoryOrder
             
            if (!localCategoryOrder || localCategoryOrder.length === 0) {
                categoryOrder = defaultCategories
                localStorage.setItem('categoryOrder', JSON.stringify(defaultCategories))   
            } else {
                categoryOrder = localCategoryOrder    
            } 
            return categoryOrder    
        } 
    }
})();