interface buttonProps {
  buttonText: string;
  onClick: () => Promise<void>;
}
const Button: React.FC<buttonProps> = ({ buttonText, onClick }) => {
  return (
    <button
      className="p-3  m-8 w-full bg-black text-white rounded-lg  hover:bg-slate-700 mx-auto "
      onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default Button;
