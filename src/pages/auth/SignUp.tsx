import Button from '@/components/common/button/Button';
import { BUTTON_TYPE } from '@/constants/BUTTON';

export default function SignUp() {
  return (
    <div>
      회원가입
      <Button>PRIMARY</Button>
      <Button styleType={BUTTON_TYPE.SECONDARY}>SECONDARY</Button>
    </div>
  );
}
