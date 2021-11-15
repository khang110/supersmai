var dataFilter = (state = { addressFilter: "", categoryFilter: []}, action) => {
    switch (action.type) {
        case 'FILTER_ADDRESS':
            return {
                ...state,
                addressFilter: action.addressFilter
            }
        
        case 'RESET_FILTER_ADDRESS':
            return {
                ...state,
                addressFilter: "",
            }
        case 'FILTER_CATEGORY':
            return {
                ...state,
                categoryFilter: action.categoryFilter
            }
        
        case 'RESET_FILTER_CATEGORY':
            return {
                ...state,
                categoryFilter: [],
            }
        default:
            return state
    }
}

export default dataFilter;