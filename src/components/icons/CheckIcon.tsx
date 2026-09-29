const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        xmlSpace="preserve"
        className={props.className}
        fill="currentColor"
        {...props}
    >
        <path fillRule="evenodd" d="M13.707 4.293a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L7 9.586l5.293-5.293a1 1 0 0 1 1.414 0" />
    </svg>
);
export default CheckIcon;
