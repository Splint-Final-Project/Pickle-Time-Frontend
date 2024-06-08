import WholePickleCardSkeleton from '@/components/picklecard/WholePickleCardSkeleton';

interface InfinitePickleCardLoaderProps {
  loaderRef: React.RefObject<HTMLDivElement>;
  [key: string]: any;
}
export default function InfinitePickleCardLoader({ loaderRef, ...props }: InfinitePickleCardLoaderProps) {
  return (
    <div ref={loaderRef} {...props}>
      {Array.from({ length: 5 }).map((_, index) => (
        <WholePickleCardSkeleton key={index} />
      ))}
    </div>
  );
}
