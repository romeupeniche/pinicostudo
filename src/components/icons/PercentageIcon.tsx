const PercentageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        xmlSpace="preserve"
        className={props.className}
        {...props}
    >
        <path fillRule="evenodd" clipRule="evenodd" d="M7.25 10.5a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5m-1.543 9.207a1 1 0 0 1-1.414-1.414l14-14a1 1 0 1 1 1.414 1.414zM13 17.25a3.75 3.75 0 1 0 7.5 0 3.75 3.75 0 0 0-7.5 0M7.25 8.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5m11.25 8.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0" fill="currentColor" />
    </svg>
);
export default PercentageIcon;
