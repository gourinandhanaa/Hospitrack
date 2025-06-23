export function Button({ children, className, onClick }) {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded bg-blue-500 text-white ${className}`}
      >
        {children}
      </button>
    );
  }
  