import Benefits from './Benefits';
import PaymentMeans from './PaymentMeans';
import PaymentSection from './PaymentSection';
import PaymentTerms from './PaymentTerms ';
import PicklePreviewCard from './PicklePreviewCard';
import PointDisCount from './PointDiscount';
import TotalPayment from './TotalPayment';

const PaymentWindow = {
  Section: PaymentSection,
  PreviewPickle: PicklePreviewCard,
  Point: PointDisCount,
  FinalAmount: TotalPayment,
  Methods: PaymentMeans,
  PaymentEvent: Benefits,
  PaymentTerms,
};

export default PaymentWindow;
