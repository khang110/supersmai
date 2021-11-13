var dataFilter = (state = { addressFilter: "",}, action) => {
    switch (action.type) {
        case 'FILTER_ADDRESS':
            return {
                ...state,
                addressFilter: action.addressFilter
            }
        
        case 'RESET_FILTER':
            return {
                ...state,
                addressFilter: "",
            }
        default:
            return state
    }
}

export default dataFilter;