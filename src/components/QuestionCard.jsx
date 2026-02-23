import React from 'react';

function QuestionCard({ question, children }) {
  return (
    <div>
      <h3>{question}</h3>
      <div>{children}</div>
    </div>
  );
}

export default QuestionCard;

