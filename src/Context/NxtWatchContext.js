import React from 'react'

const NxtWatchContext = React.createContext({
  savedItems: [],
  addSaveItems: () => {},
  isTheme: false,
  themeIsClicked: () => {},
})

export default NxtWatchContext
