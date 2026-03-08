import React from 'react';

function Threats() {
  const currentChapter = JSON.parse(sessionStorage.getItem('currentChapter') || '{}');
  currentChapter.state = 'in Progress';
  sessionStorage.setItem('currentChapter', JSON.stringify(currentChapter));

  return (
    <div>
      <h2>Unit 1 - Threats</h2>
      <p>This is a placeholder for the Unit 1 Threats screen.</p>
    </div>
  );
}

export default Threats;

