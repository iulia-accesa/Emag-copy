
export interface State{
    searchResult:SearchBarProduct[]
}



export const initState: State = {
    searchResult:[]
   
}
export const reducer = createReducer(
    initState,
    on(fromSearchActions.inputChanged,(state,action) => {
        
        return {
            searchResult:state.searchResult
        }
    })
    ,
    on(fromSearchActions.updateSearchResult,(state,action) => {
        return {
            searchResult: action.payload
        }
    })

    
);