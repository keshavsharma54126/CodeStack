import Auth from "../components/Auth";
import Quote from "../components/Quote";

const Signin = () => {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      <div className="flex justify-center items-center p-8 bg-white w-full">
        <Auth type="signin" />
      </div>
      <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 w-full">
        <Quote />
      </div>
    </div>
  );
};

export default Signin;
