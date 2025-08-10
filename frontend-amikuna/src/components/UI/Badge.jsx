const Badge = ({ count }) => {
  if (!count || count <= 0) return null;

  return (
    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full min-w-[20px] min-h-[20px]">
      {count > 99 ? '99+' : count}
    </span>
  );
};

export default Badge;
