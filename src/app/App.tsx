import './styles/index.scss';

import { AppRouter } from '@/app/providers/router';
import { Header } from '@/features/Header';

const App = () => {
    return (
        <div className="app">
            <Header />
            <AppRouter />
        </div>
    );
};

export default App;
