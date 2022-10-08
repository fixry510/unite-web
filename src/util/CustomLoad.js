import React, { useEffect, useRef } from 'react'
import loadLottie from '../lotties/lf30_editor_5l2mlq26.json';
import Lottie from 'react-lottie';
import { useSelector, useDispatch } from 'react-redux'

const CustomLoad = () => {

  const isLoad = useSelector((state) => state.loadWrap.isLoad);

  console.log(isLoad)

  const lottieOption = {
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: loadLottie,
  };

  if (!isLoad) {
    return
  }

  return (
    <React.Fragment>
      <div className='w-full h-screen  flex justify-center items-center fixed left-0 top-0   bg-black
      bg-opacity-30'>
        <Lottie options={lottieOption} width={120} height={120} />
      </div>
    </React.Fragment>
  )
}

const LoadSelft = () => {

  const lottieOption = {
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: loadLottie,
  };


  return <Lottie options={lottieOption} width={120} height={120} />
}

export { LoadSelft }

export default CustomLoad