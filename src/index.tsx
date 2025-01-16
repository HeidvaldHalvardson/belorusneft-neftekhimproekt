import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/app/App';
import { LocalFilterProvider } from '@/app/providers/LocalFilterProvider';
import { StoreProvider } from '@/app/providers/StoreProvider';

const container = document.getElementById('root');

async function enableMocking() {
    if (process.env.NODE_ENV === 'development') {
        const { worker } = await import('./app/mocks');
        return worker.start();
    }
    return Promise.resolve();
}

if (container) {
    const root = createRoot(container);

    enableMocking()
        .then(() => {
            root.render(
                <BrowserRouter>
                    <StoreProvider>
                        <LocalFilterProvider>
                            <App />
                        </LocalFilterProvider>
                    </StoreProvider>
                </BrowserRouter>,
            );
        })
        .catch(error => {
            console.error('Failed to start mocking:', error);
        });
} else {
    throw new Error(
        "Root element with ID 'root' was not found in the document. " +
            "Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
    );
}
