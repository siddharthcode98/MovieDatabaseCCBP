import React from 'react'

const Context = React.createContext({
  search: '',
  searchfn: () => {},
  searchList: [],
  loading: true,
  currentPage: 1,
  turnPage: () => {},
})

export default Context
