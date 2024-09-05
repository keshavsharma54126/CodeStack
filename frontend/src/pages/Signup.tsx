import Quote from "../components/Quote";
import Auth from "../components/Auth";
const Signup = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex justify-center items-center p-8 bg-white">
        <Auth type="signup" />
      </div>
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
        <Quote />
      </div>
    </div>
  );
};

export default Signup;
