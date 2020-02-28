import React from 'react';
import RecList from './components/RecList.js';

function App() {
  return (
    <div style={{margin: '10px 10px 10px 10px'}}>
      <h4>Recommendation List</h4>
      <RecList recs={[{'title': 'Chicken'}, {'title': 'Not chicken'}, {'title': 'Chicken'}, {'title': 'Not chicken'}, {'title': 'Chicken'}, {'title': 'Not chicken'}]} />
    </div>
  );
}

export default App;
