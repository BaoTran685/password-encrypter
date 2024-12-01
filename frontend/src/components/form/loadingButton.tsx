import { Spinner, Tick } from "../icon/icons"


interface Props {
  type: "button" | "submit" | "reset" | undefined,
  text: string,
  className: string,
  isLoading: boolean,
  isSuccess: boolean,
  onClick: Function,
}

const LoadingButton = ({ type, text, className, isLoading, isSuccess, onClick }: Props) => {
  return (
    <button
      type={type}
      className={`text-white text--sub--small w-full rounded-lg hover:brightness-125 ${className}`}
      onClick={() => onClick({text})}
      disabled={isLoading}
    >
      <span className='flex items-center justify-center px-4 py-2'>
        {isLoading ? (
          <Spinner />
        ) : (
          isSuccess ? (
            <Tick />
          ) : (
            text
          )
        )}
      </span>
    </button>
  )
}

export default LoadingButton;