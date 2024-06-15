
interface buttonProps{
    buttonText:string
    onClick:()=>null
}
const Button: React.FC<buttonProps> = ({buttonText,onClick}) => {
  return (
    <button className="p-3 m-8 w-96 bg-black text-white rounded-md  hover:bg-slate-700" onClick={onClick}>
    {buttonText}
  </button>
  )
}

export default Button