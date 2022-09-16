import {
  atom,
  selector,
  useRecoilState,
	useRecoilValue
} from 'recoil';
import {themeMode} from '@/lib/config'
const themeModeState = atom({
	key: 'themeMode',
	default: themeMode === 'dark',
});

export { themeModeState }