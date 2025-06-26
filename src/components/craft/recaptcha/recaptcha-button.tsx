export const RecaptchaButton = () => {
  return (
    <div className="p-8 flex flex-col gap-2">
      <label
        style={{
          fontFamily: 'Nunito',
        }}
        className="bg-gray-100 w-fit mx-auto select-none items-center grid grid-cols-[1em_auto] gap-3 font-semibold text-ken-grey rounded-full p-2 px-3"
      >
        <input type="checkbox" className="appearance-none bg-white m-0" />
        I'm not a robot
      </label>
      <div className=" h-80 w-80 flex flex-col pb-4 gap-4 bg-[#fafafa] rounded-2xl p-1 shadow-[rgba(149,157,165,0.2)_0px_2px_4px_0px]">
        <div className="h-[calc(100%-3rem)] rounded-2xl w-full bg-[#fff]"></div>
        <div className="self-end px-4">
          <button
            type="button"
            style={{
              fontFamily: 'Nunito',
            }}
            className="bg-[#006cff] w-fit  rounded-full px-5 py-1 text-white font-semibold"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  )
}
