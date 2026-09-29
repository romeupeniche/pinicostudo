const LocationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        xmlSpace="preserve"
        className={props.className}
        {...props}
    >
        <path fill="currentColor" d="M8 0a6 6 0 0 1 4.82 9.574L8 16 3.18 9.574A6 6 0 0 1 8 0m0 2a4 4 0 0 0-3.217 6.378L8 12.667l3.217-4.289A4 4 0 0 0 8 2m0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4" />    </svg>
);
export default LocationIcon;
