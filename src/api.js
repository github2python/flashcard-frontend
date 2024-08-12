import React, { useState, useEffect } from "react";
import { createFlashcard, updateFlashcard } from "../api"; // Import API functions
import "../styles/FlashcardForm.css"; // Import CSS for styling

const FlashcardForm = ({ initialData = {}, onSubmit }) => {
  console.log(initialData);
  const [question, setQuestion] = useState(initialData?.question || "");
  const [answer, setAnswer] = useState(initialData?.answer || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setQuestion(initialData.question || "");
    setAnswer(initialData.answer || "");
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const flashcard = { question, answer };

    try {
      if (initialData?.id) {
        await updateFlashcard(initialData.id, flashcard);
      } else {
        await createFlashcard(flashcard);
      }
      onSubmit();
      setQuestion("");
      setAnswer("");
    } catch (err) {
      setError("An error occurred while saving the flashcard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flashcard-form">
      <h2>{initialData.id ? "Edit Flashcard" : "Add Flashcard"}</h2>
      <div>
        <label>Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Answer:</label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : initialData.id ? "Update" : "Add"} Flashcard
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default FlashcardForm;
