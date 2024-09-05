import Auth from "../components/Auth";
import Quote from "../components/Quote";

const Signin = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex justify-center items-center p-8 bg-white">
        <Auth type="signin" />
      </div>
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
        <Quote />
      </div>
    </div>
  );
};

export default Signin;
