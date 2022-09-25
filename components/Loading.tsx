import React, {useEffect} from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { themeModeState } from '@/model'
import { useRecoilValue } from 'recoil'

export const Loading: React.FC = () => {
	const isDarkMode = useRecoilValue(themeModeState)

	return (
		<div className={`flex-col pageContainer notion-app notion ${isDarkMode ? 'dark-mode' : ''}`}>
			<div className='mb-20px'><AiOutlineLoading3Quarters className='h-30px text-white animate-spin w-30px' /></div>
			<div className=''>页面加载中...</div>
		</div>
	)
}
