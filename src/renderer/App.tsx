import { MemoryRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Converter from './pages/Converter';
import Generator from './pages/Generator';
import Resizer from './pages/Resizer';
import Remover from './pages/Remover';
import Settings from './pages/Settings';
import Shrinker from './pages/Shrinker';
import Support from './pages/Support';
import Downloader from './pages/Downloader';

import './autoload';
import './App.css';

const App: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/convert" element={<Converter />} />
        <Route path="/download" element={<Downloader />} />
        <Route path="/support" element={<Support />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/compress" element={<Shrinker />} />
        <Route path="/resize" element={<Resizer />} />
        <Route path="/generate" element={<Generator />} />
        <Route path="/remove" element={<Remover />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
