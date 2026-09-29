const AddIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        xmlSpace="preserve"
        className={props.className}
        {...props}
    >
        <path
            fill="currentColor"
            d="M24 14h-6V8a2 2 0 0 0-4 0v6H8a2 2 0 0 0 0 4h6v6a2 2 0 0 0 4 0v-6h6a2 2 0 0 0 0-4"
        />
    </svg>
);
export default AddIcon;
