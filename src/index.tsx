import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/app/App';

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);

    root.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
    );
} else {
    throw new Error(
        "Root element with ID 'root' was not found in the document. " +
            "Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
    );
}
