const categoriesLS = (() => {
    return {
        toggle: e => {
            const deletedCategories = categoriesLS.get()
            const switchStatus = e.target ? e.target.checked : e.checked
            let categoryName = e.target ? e.target.id : e.id
            categoryName = categoryName.replace('toggle', '').toLowerCase()
    
            if (!switchStatus) deletedCategories.push(categoryName)
            else if (switchStatus) deletedCategories.splice(deletedCategories.indexOf(categoryName), 1)
    
            localStorage.setItem('deletedCategories', JSON.stringify(deletedCategories))
            
            if (deletedCategories && deletedCategories.length === 0) localStorage.removeItem('deletedCategories')   
        },
        get: () => syncWithLS("deletedCategories", [])
    }
})();

const categoryOrder = (() => {
    const defaultCategories = ["europe","health", "sports", "business", "technology"]
    
    return {
        add: categoryNames => {
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

function sortCategoryOrder(categoryArrayOrder, articlesLS) {
    let articleLSCatories = []
    let finalCategoryOrder = []

    // create array of saved categories from LS 
    articlesLS.forEach(article => {
        if (!articleLSCatories.includes(article.category)) {
            articleLSCatories.push(article.category)
        }
    })
    // sort the saved categories to match user selected order
    categoryArrayOrder.forEach(category => {
        if (articleLSCatories.includes(category)) {
            finalCategoryOrder.push(category)
        }
    })
    return finalCategoryOrder
}