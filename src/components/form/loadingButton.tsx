import { Spinner, Tick } from "../icon/icons"


interface Props {
  type: "button" | "submit" | "reset" | undefined,
  text: string,
  isLoading: boolean,
  isSuccess: boolean
}

const LoadingButton = ({ type, text, isLoading, isSuccess }: Props) => {
  return (
    <button
      type={type}
      className='text-white text-sm w-fit rounded-lg bg-[#8d2230] hover:brightness-125'
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