import { ComponentType, useEffect } from 'react';
import useBottomSheetModalState from './zustand/useBottomSheetModalState';
/**
 *
 * @바텀시트모달사용방법
 * useBottomSheetModal를 호출 할때는 객체로 renderComponent라는 것을 넣어줘야합니다
 * 이 renderComponent는 모달안에 들어가는 내용을 반환하는 jsx함수를 넣어주면 됩니다.
 * 반환컴포넌트 최상단요소에 넓이를 지정해줘야합니다. (넓이를 유동적으로 하기위함)
 * 인자로 들어가는 컴포넌트는 handleClose(모달 닫는 함수)라는 것을 props로 받을 수 있습니다
 * 이를 이용해 모달 닫기ui를 커스텀할 수 있습니다.(esc눌러도 닫히긴 합니다)
 * 이 훅을 호출하면 handleOpen를 반환합니다. 이 함수를 이용해 모달을 활성화 시킬 수 있습니다.
 */

/** 
 * @사용예시
 * export default function Home() {
 *  const {handleOpen} = useBottomSheetModal({renderComponent : Content})
 *  return(
 *      <button onClick={handleOpen}>바텀시트 모달 오픈!</button>
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
export default function useBottomSheetModal({ renderComponent }: { renderComponent: ComponentType<any> }) {
  const { handleOpen, setComponent } = useBottomSheetModalState(state => state);
  useEffect(() => {
    setComponent(renderComponent);
    return () => {
      setComponent(null);
    };
  }, [renderComponent]);

  return { handleOpen };
}
