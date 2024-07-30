const ZeroTodosText = ({ text = "tasks" }: { text: string }) => {
  return (
    <div className="w-full h-[30vh] text-center flex justify-center items-center">
      <p className="text-p1">All your {text} show up here.</p>
    </div>
  );
};

export default ZeroTodosText;
