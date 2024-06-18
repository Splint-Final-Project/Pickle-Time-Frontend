import StarIcon from '@/assets/icons/StarIcon';

export default function Rating({ rating = 3 }) {
  const filledStars = Math.min(rating, 5);

  return (
    <div style={{ display: 'flex', gap: '0.33rem' }}>
      {[1, 2, 3, 4, 5].map(index => (
        <StarIcon key={index} filled={index - 1 < filledStars} size={14} />
      ))}
    </div>
  );
}
