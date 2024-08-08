const ZeroTodosText = ({ text = "tasks" }: { text?: string }) => {
  return (
    <div className="flex h-[30vh] w-full items-center justify-center text-center">
      <p className="text-p1">All your {text} show up here.</p>
    </div>
  );
};

export default ZeroTodosText;
