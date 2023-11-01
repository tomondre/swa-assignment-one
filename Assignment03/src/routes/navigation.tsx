import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from '../store/store';
import { logout } from '../store/user/user.action';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { Dispatch, AnyAction } from 'redux';

const Navigation = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const logOut = () => {
    const token = JSON.parse(localStorage.getItem('token') || '');
    if(token){
      // localStorage.removeItem('token');
      dispatch(logout(token.requestId));
    }
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
              <a href="/profile" className="btn btn-ghost">
                Profile
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
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;

function dispatch(arg0: AsyncThunkAction<any, string, { state?: unknown; dispatch?: Dispatch<AnyAction> | undefined; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown; }>) {
  throw new Error('Function not implemented.');
}

