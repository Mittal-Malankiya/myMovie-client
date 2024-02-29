import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import "./index.scss"; // Import statement to indicate that you need to bundle `./index.scss`
const MyFlixApplication = () => { // Main component (will eventually use all the others)
    
        <div>
        <h1>Hello React!</h1>
      </div>>
    <MainView />
  };
  // Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);