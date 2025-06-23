export function Card({ children, className, onClick }) {
    return (
      <div 
        className={`p-6 rounded-lg shadow-md bg-white ${className} cursor-pointer`} 
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
  