import SignUpForm from '../components/sign-up-form';
import LoginForm from '../components/login-form';

const Home = () => {
  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold mb-8">Authentication</h1>
      <div className="flex gap-16">
        <SignUpForm />
        <LoginForm />
      </div>
    </div>
  );
};

export default Home;
