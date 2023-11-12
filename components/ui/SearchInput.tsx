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
                className="dark:bg-[#121212] dark:text-white dark:placeholder-gray-500 dark:border-gray-800" />
        </>
    );
};