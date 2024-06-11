import DatePicker from '@/components/datePicker/DatePicker';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import { useNavigate } from 'react-router-dom';

export default function CreatePickle2() {
  const {
    deadLine,
    when,
    category,
    setDeadLine,
    setWhen,
    setCategory,
  } = usePickleCreation();
  const navigate = useNavigate();

  return (
    <div>
      <form onSubmit={() => navigate('/pickle-create-payment')}>
        {/* <label htmlFor="deadline">Deadline:</label> */}
        {/* <input type="date" id="deadline" value={deadLine} onChange={(e) => setDeadLine(e.target.value)} /> */}

        {/* <label htmlFor="category">Category:</label>
        <textarea id="category" value={category} onChange={e => setCategory(e.target.value)} /> */}
        <DatePicker/>
      </form>
    </div>
  );
}
