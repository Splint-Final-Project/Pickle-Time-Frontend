export const formatCurrency = (cost: number): string => {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(cost).replace('₩', '');
};
