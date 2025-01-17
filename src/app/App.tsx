import './styles/index.scss';

import { AppRouter } from '@/app/providers/router';
import { Header } from '@/widgets/Header';

const App = () => {
    return (
        <div className="app">
            <Header />
            <AppRouter />
        </div>
    );
};

export default App;
