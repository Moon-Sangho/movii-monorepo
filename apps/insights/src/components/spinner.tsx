const Spinner = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-(--color-primary10)" />
    </div>
  );
};

export default Spinner;
