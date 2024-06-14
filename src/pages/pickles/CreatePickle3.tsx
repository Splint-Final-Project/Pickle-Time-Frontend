import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  InputComponent,
  StepIndicator,
  StepIndicatorContainer,
  SubmitButton,
  Title,
  TitleContainer,
} from './CreatePickleStyled';
import CapacitySelect from '@/components/inCreatePickleThree/capacitySelect/CapacitySelect';
import WriteDetail from '@/components/inCreatePickleThree/writeDetail/WriteDetail';
import GoalSelect from '@/components/inCreatePickleThree/goalSelect/GoalSelect';
import ImgSelect from '@/components/inCreatePickleThree/imgSelect/ImgSelect';
import OpenAI from 'openai';
import client from '@/apis/axios';

export default function CreatePickle3() {
  const {
    file,
    capacity,
    explanation,
    goals,
    setImgUrl
  } = usePickleCreation();
  const navigate = useNavigate();

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
    dangerouslyAllowBrowser: true,
  });

  async function generateImage() {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `"${title}"라는 제목으로 스터디 모임을 만들고 싶은데, 우리 모임을 소개하는 간결한 이미지를 생성해 줘. 글자는 넣지 말고, 멀리서도 잘 보여야 하니 아주 단순해야 해.`,
      n: 1,
      size: '1024x1024',
    });
    const image_url = response.data[0].url;
    console.log(image_url);
  }

  async function generateExplanation() {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful and creative writer that only speaks Korean.' },
        {
          role: 'user',
          content: `"${title}"라는 제목으로 스터디 모임을 만들고 싶은데, 재미있고 창의적인 소개글을 써 줘. 지향하는 분위기와 주의사항 등을 포함해야 해. 공백포함 200자를 넘어선 안 돼.`,
        },
      ],
      model: 'gpt-4o',
    });

    console.log(completion.choices[0].message.content);
  }

  async function generateGoals() {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful and creative writer that only speaks Korean.' },
        {
          role: 'user',
          content: `"${title}"라는 제목으로 스터디 모임을 만들고 싶은데, 숫자로 표현 가능한 목표를 다섯 가지 정도 추천해 줘. 단어 다섯 개를 comma로 구분해서 답변해 줘.`,
        },
      ],
      model: 'gpt-4o',
    });

    console.log(completion);
  }

  const postImg = async () => {
    try {
      const formData = new FormData();

      if (file) {
        formData.append('file', file);
        const post = await client.post('/pickle/test', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(post.data.file);
        setImgUrl(`http://localhost:8080/${post.data.file}`)
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container>
      <TitleContainer>
        <Title>
          <img src="icons/back.svg" alt="back" onClick={() => navigate('/pickle-create-2')} />
          <div>피클 생성</div>
        </Title>
        <StepIndicatorContainer>
          <StepIndicator $selected={false}>1</StepIndicator>
          <StepIndicator $selected={false}>2</StepIndicator>
          <StepIndicator $selected={true}>3</StepIndicator>
          <StepIndicator $selected={false}>4</StepIndicator>
        </StepIndicatorContainer>
        <ImgSelect/>
        <button onClick={postImg}>post</button>
      </TitleContainer>

      {/* 상세 설명 */}
      <InputComponent>
        <WriteDetail/>
      </InputComponent>

      {/* 참여 인원 */}
      <InputComponent>
        <CapacitySelect/>
      </InputComponent>

      {/* 목표 설정 */}
      <InputComponent>
        <GoalSelect/>
      </InputComponent>
      <SubmitButton onClick={() => navigate('/pickle-create-4')}>다음 단계로 넘어가기</SubmitButton>
    </Container>
  );
}
