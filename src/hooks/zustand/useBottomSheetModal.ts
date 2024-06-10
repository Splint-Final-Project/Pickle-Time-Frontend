import { ComponentType } from 'react';
import { create } from 'zustand';

interface ModalState {
  active: boolean;
  handleOpen: ({ renderComponent }: { renderComponent: ComponentType<any> }) => void;
  handleClose: () => void;
  component: ComponentType<any> | null;
}
/**
 *
 * @바텀시트모달사용방법
 * useBottomSheetModal를 호출하여 handleOpen함수를 가져옵니다
 * 이 함수를 이용하여 모달을 호출할 수 있습니다.
 * @handleOpen함수
 * handleOpen함수는 renderComponent라는 객체를 인자로 넣어줘야 합니다.
 * 이 때 renderComponent는 모달안의 들어갈 jsx를 반환하는 함수를 넣어주면 됩니다.
 * 반환컴포넌트 최상단요소에 넓이를 지정해줘야합니다. (넓이를 유동적으로 하기위함)
 * 인자로 들어가는 컴포넌트는 handleClose(모달 닫는 함수)라는 것을 props로 받을 수 있습니다
 * 이를 이용해 모달 닫기ui를 커스텀할 수 있습니다.(esc눌러도 닫히긴 합니다)
 *
 */

/** 
 * @사용예시
 * export default function Home() {
 *  const modalOpen = useBottomSheetModal(state => state.handleOpen); 또는 const {handleOpen} = useBottomSheetModal(state => state); 이렇게 사용해도 됨
 *  return(
 *      <button onClick={() => modalOpen({renderComponent : Content})}>바텀시트 모달 오픈!</button>
 *   )
 * }
 * 
 * function Content ({handleClose}) {
 *  return(
 *      <div style={{width : '200px'}}>
 *         바텀시트 모달 내용들...
 *        <button onClick={handleClose}>모달 닫기</button>
 *      </div>
 *  )
 * }
  
*/
const useBottomSheetModal = create<ModalState>()(set => ({
  active: false,
  handleOpen: ({ renderComponent }) => set(() => ({ active: true, component: renderComponent })),
  handleClose: () => set(() => ({ active: false, component: null })),
  component: null,
}));

export default useBottomSheetModal;
