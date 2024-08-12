import React from "react";
import Header from "./components/Header";
import FlashcardList from "./components/FlashcardList";
import "./"; // Import global styles

const App = () => {
  return (
    <div className="app">
      <Header />
      <FlashcardList />
    </div>
  );
};

export default App;
