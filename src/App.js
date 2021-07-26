import React from "react";
import InfiniteScroll from "./components/InfiniteScroll/InfiniteScroll";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./App.scss";

function App() {
  return (
    <ErrorBoundary>
      {/* The below component will load the images and implement the infinite scroll */}
      <InfiniteScroll></InfiniteScroll>
    </ErrorBoundary>
  );
}

export default App;
