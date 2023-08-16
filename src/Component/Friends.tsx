import { useEffect } from 'react';
import Avatar from '../assets/ahmaidi.png';
import { PlayIcon, BlockIcon } from './Icons';

export default function Friends() {
  // useEffect(() => {
  //   axios.get(`${process.env.SERVER_HOST}/api/v1/user/friends`, { withCredentials: true })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       if (error.response?.status === 401) {
  //         window.location.href = '/login';
  //         console.log('Unauthorized');
  //       }
  //     });
  // }, []);
  return (
    <div className="flex w-[full] items-center text-white iphone:text-[10px] tablet:text-[15px] imac:text-[24px]">
      <div className='flex flex-col w-[40%] m-auto bg-background py-3 pl-3 rounded-xl'>
        <div className='flex w-[90%] justify-between  m-auto'>
          <div className='flex items-center gap-4 '>
            <img src={Avatar} alt="avatar" className="iphone:w-5 iphone:h-5 tablet:w-8 tablet:h-8 imac:w-12 imac:h-12 rounded-full" />
            <span>Ahmaidi</span>
          </div>
          <div className='flex items-center gap-2'>
          <button className='bg-buttonPlaybgColor p-2 rounded-[50%]'><PlayIcon className="w-9 h-9" /></button>
          <button className='bg-buttonPlaybgColor p-2 rounded-[50%]'><BlockIcon className="w-8 h-8" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
