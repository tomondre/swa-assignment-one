import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../store/user/user.action';
import { UserData } from '../types/user-data';

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentUser: UserData = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const action = await dispatch(getProfile(currentUser));
      const response: UserData = action.payload;
      setUsername(response.username);
      setPassword(response.password);
    };
    fetchData();
  }, [currentUser]);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: UserData = {
      userId: currentUser.userId,
      username: username,
      password: password,
      token: currentUser.token,
      admin: false,
    };
    await dispatch(updateProfile(data));
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold">Profile</h2>
      <form className="flex flex-col gap-4" onSubmit={handleUpdateProfile}>
        <div>
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            name="username"
            value={username}
            disabled={true}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            placeholder="Enter your username"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
