import { OnlineIcon, PlayIcon, BlockIcon, SendIcon } from './Icons';
import Box_message from './BoxMsg';
import avatar from '../assets/ahmaidi.png'
const Chat_box = () => {
    return (
        <div className='flex flex-col gap-2 bar-chat px-3 overflow-hidden w-full'>
            <div className="flex w-full">
                <div className="flex gap-2 p-4">
                    <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                    <div className="flex flex-col gap-1">
                        <p className="text-msgColorOn text-[12px]">Ahmaidi</p>
                        <div className="flex gap-1">
                            <OnlineIcon className="w-2 h-2" /><p className="text-msgColorOn text-[12px]">Online</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 ml-auto items-center">
                    <button className='bg-buttonPlaybgColor p-2 rounded-[50%]'><PlayIcon className="w-6 h-6" /></button>
                    <button className='bg-buttonPlaybgColor p-2 rounded-[50%]'><BlockIcon className="w-6 h-6" /></button>
                </div>
            </div>
            <div className="flex flex-col gap-2 overflow-auto h-[60vh] item-center " style={{ maxHeight: '75vh' }}>
                {
                    [...Array(30)].map((_, i) => (
                        <Box_message key={i} color={i % 2 === 0 ? '#01101F' : '#2E8CE5'}
                            reduis={i % 2 === 0 ? '30px 30px 30px 0px' : '30px 30px 0px'}
                            alignSelf={i % 2 === 0 ? 'flex-start' : 'flex-end'} />
                    ))
                }
            </div>
            <form className='flex rounded-xl bg-msgColorOn p-2 mb-2'>
                <input className="w-full  text-[12px] placeholder-text-[12px] bg-transparent" type="text" placeholder="Type your message..." />
                <button type="submit" id="submit" hidden></button>
                <label htmlFor="submit">
                    <SendIcon />
                </label>
            </form>

        </div>
    );
}

export default Chat_box;