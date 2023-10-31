import { Outlet } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl" href="/">
            Match3 Game
          </a>
        </div>
        <div className="flex-none flex gap-4">
          <a href="/high-scores" className="btn btn-ghost">
            High scores
          </a>
          <a href="/profile" className="btn btn-ghost">
            Profile
          </a>
          <a href="/play" className="btn btn-primary">
            Play
          </a>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
