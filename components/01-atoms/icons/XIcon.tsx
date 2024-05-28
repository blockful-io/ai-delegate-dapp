export const XIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="X" clip-path="url(#clip0_2_474)">
        <path
          id="Vector"
          d="M18.0609 20.0812L12 14.0203L5.93909 20.0812L3.91878 18.0609L9.97969 12L3.91878 5.93907L5.93909 3.91876L12 9.97968L18.0609 3.91876L20.0812 5.93907L14.0203 12L20.0812 18.0609L18.0609 20.0812Z"
          fill={props.fill ? props.fill : "#F6F9F6"}
        />
      </g>
      <defs>
        <clipPath id="clip0_2_474">
          <rect
            width="24"
            height="24"
            fill={props.fill ? props.fill : "#FFF"}
          />
        </clipPath>
      </defs>
    </svg>
  );
};
