import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation';
import Home from './routes/home';
import HighScores from './routes/high-scores';
import Profile from './routes/profile';
import Play from './routes/play';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="high-scores" element={<HighScores />} />
        <Route path="profile" element={<Profile />} />
        <Route path="play" element={<Play />} />
      </Route>
    </Routes>
  );
}

export default App;
