import React, { useState, useEffect } from "react";
import axios from "axios";
import Flashcard from "./Flashcard";
import FlashcardForm from "./FlashcardForm";
import "../styles/FlashcardList.css"; // Import CSS for styling

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editingFlashcard, setEditingFlashcard] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/flashcards");
      setFlashcards(response.data);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const deleteFlashcard = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
      fetchFlashcards();
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
  };

  const handleUpdate = (updatedFlashcard) => {
    setEditingFlashcard(updatedFlashcard);
  };

  return (
    <div className="flashcard-list">
      <FlashcardForm
        initialData={editingFlashcard}
        onSubmit={() => {
          fetchFlashcards();
          setEditingFlashcard(null);
        }}
      />
      <div className="flashcard-container">
        {flashcards?.length > 0 && (
          <>
            <div className="flashcard-wrapper">
              <button
                onClick={() => handleUpdate(flashcards[currentIndex])}
                className="button button-edit"
              >
                Edit
              </button>

              <button onClick={handlePrevious} className="prev button-nxt">
                Previous
              </button>

              <Flashcard flashcard={flashcards[currentIndex]} />
              <button
                onClick={() => deleteFlashcard(flashcards[currentIndex].id)}
                className="button button-delete"
              >
                Delete
              </button>

              <button onClick={handleNext} className="nxt button-nxt">
                Next
              </button>
            </div>
            {/* <div className="nav-buttons">
              <button onClick={handlePrevious} className="prev button-nxt">
                Previous
              </button>
              <button onClick={handleNext} className="nxt button-nxt">
                Next
              </button>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default FlashcardList;
