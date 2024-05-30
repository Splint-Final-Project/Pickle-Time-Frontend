interface SearchIconProps {
  size?: number;
}

export default function SearchIcon({ size = 16, ...props }: SearchIconProps) {
  return (
    <>
      <img
        width={size}
        height={size}
        src="https://img.icons8.com/material-rounded/192/4a4a4a/search.png"
        alt="search"
        {...props}
      />
      <div id="license" style={{ display: 'none' }}>
        <a href="https://icons8.com/icon/83218/search">Search</a> icon by <a href="https://icons8.com">Icons8</a>
      </div>
    </>
  );
}
