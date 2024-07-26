import { useState } from 'react'
import SearchBar from './SearchBar'
import CountriesList from './CountriesList'

import React from 'react'

function Home() {
    const [query, setQuery] = useState('')
  return (
    <main>
        <div className="search-filter-container">
          <SearchBar setQuery={setQuery} />

        </div>

        {/* First time it will render (everycase) after that no repeatation
        page se kab hatega? (cleanup function) jab unmount hoga(page se content hatjayega) basically page se hat jayega */}
        
        {query === 'unmount' ? '' : <CountriesList query={query} />}   
    </main>
  )
}

export default Home