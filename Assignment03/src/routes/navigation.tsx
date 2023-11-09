import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { logout } from '../store/user/user.action';
import { UserData } from '../types/user-data';
import { Toaster } from 'react-hot-toast';

const Navigation = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const currentUser: UserData = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const logOut = async () => {
    if (!currentUser || !currentUser.token) return;

    await dispatch(logout(currentUser.token));
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" to="/">
            Match3 Game
          </Link>
        </div>
        <div className="flex-none flex gap-4">
          {currentUser && (
            <>
              <Link to="/high-scores" className="btn btn-ghost">
                High scores
              </Link>
              <Link to="/" className="btn btn-ghost" onClick={logOut}>
                Logout
              </Link>
              <Link to="/play" className="btn btn-primary">
                Play
              </Link>
            </>
          )}
        </div>
        <Toaster />
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
