import { useState } from "react";


export default function Header() {
  const [isDark,setIsDark] = useState(false);
  return (
    <header className="header-container">
      <div className="header-content">
        <h2 className="title">Where in the world?</h2>
        <p className="change" onClick={() =>{
          document.body.classList.toggle('dark');
          setIsDark(!isDark)
        }}>&nbsp;&nbsp;{isDark?'Light' : 'Dark'} Mode</p>

      </div>
    </header>
  )
}
