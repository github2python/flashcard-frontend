import React, { useState } from "react";
import "../styles/Flashcard.css"; // Import CSS for styling

const Flashcard = ({ flashcard }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flashcard ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="front">
        <p>{flashcard?.question}</p>
      </div>
      <div className="back">
        <p>{flashcard?.answer}</p>
      </div>
    </div>
  );
};

export default Flashcard;
