const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className={props.className}
        {...props}
    >
        <path fill="currentColor" d="M10.86 13.27a.4.4 0 0 1-.39.33H5.53a.4.4 0 0 1-.39-.29L3.87 5H2.46l1.3 8.53A1.8 1.8 0 0 0 5.53 15h4.94a1.8 1.8 0 0 0 1.77-1.47L13.54 5h-1.41ZM13.1 2.2H11A1.39 1.39 0 0 0 9.61 1H6.39A1.39 1.39 0 0 0 5 2.2H2.9a.9.9 0 0 0-.9.9V4h12v-.9a.9.9 0 0 0-.9-.9" />
    </svg>
);
export default TrashIcon;
