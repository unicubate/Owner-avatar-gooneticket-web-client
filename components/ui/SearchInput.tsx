import { Input } from "antd";

interface Props {
    onChange: any;
    className?: string;
    placeholder: string;
}

export const SearchInput: React.FC<Props> = ({
    onChange,
    className,
    placeholder,
}) => {
    return (
        <>
            <Input
                type='text'
                onChange={onChange}
                placeholder={placeholder}
                className="dark:bg-black dark:text-white dark:placeholder-gray-500 dark:border-gray-800" />
        </>
    );
};