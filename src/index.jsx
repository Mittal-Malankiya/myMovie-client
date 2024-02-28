import { createRoot } from 'react-dom/client';
import "./index.scss"; // Import statement to indicate that you need to bundle `./index.scss`
const MyFlixApplication = () => { // Main component (will eventually use all the others)
    return (
      <div className="my-flix">
        <div>Good morning</div>
      </div>
    );
  };
  // Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);