import React, { useEffect } from 'react';
import Jobs from './components/Jobs';

function App() {
  useEffect(() => {
    document.title = 'Job Search Application'; 
  }, []);

  
  return (
    <div className="App">
      <Jobs />
    </div>
  );
}

export default App;
