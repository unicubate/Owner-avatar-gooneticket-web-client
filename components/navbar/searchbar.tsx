// import { SearchIcon } from '@heroicons/react/outline'

const Searchbar = () => {
  return (
    <div className="bg-neutral-200 px-4 py-1.5 rounded-lg md:flex items-center gap-2 hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>

      <input
        type="text"
        placeholder="Search"
        className="bg-transparent focus:outline-none"
      />
    </div>
  );
};

export default Searchbar;
