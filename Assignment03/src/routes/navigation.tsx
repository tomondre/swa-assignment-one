import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { logout } from '../store/user/user.action';
import { Toaster } from 'react-hot-toast';

const Navigation = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const currentUser : UserData = useSelector((state: RootState) => state.user.currentUser);

  const logOut = () => {
    dispatch(logout(currentUser.token));
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl" href="/">
            Match3 Game
          </a>
        </div>
        <div className="flex-none flex gap-4">
          {currentUser && (
            <>
              <a href="/high-scores" className="btn btn-ghost">
                High scores
              </a>
              <a href="/" className="btn btn-ghost" onClick={logOut}>
                Logout
              </a>
              <a href="/play" className="btn btn-primary">
                Play
              </a>
            </>
          )}
        </div>
        <Toaster/>
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;

