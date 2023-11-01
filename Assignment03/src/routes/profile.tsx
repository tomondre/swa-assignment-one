import { useEffect, useState } from "react";
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../store/user/user.action";
import { UserDataPatch, UserDataRequest } from "../types/user-data";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const action = await dispatch(getProfile(currentUser.userId));
      const response: UserDataRequest = action.payload;
      setUsername(response.username);
      setPassword(response.password);
    };
    fetchData();
  }, [currentUser]);

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: UserDataPatch = { id: currentUser.id, username: username, password: password };
    dispatch(updateProfile(data));
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
            disabled= {true}
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
