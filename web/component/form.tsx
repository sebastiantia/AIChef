interface FormProps {
  prompt: string;
  setPrompt: any;
  onSubmit: any;
  loading: boolean;
}

const Form: React.FC<FormProps> = ({
  prompt,
  setPrompt,
  onSubmit,
  loading,
}) => {
  return (
    <>
      <p className="text-center">
        Tell me what ingredients you have in your kitchen and I will generate a
        recipe for you...
      </p>
      <input
        type={"text"}
        placeholder="ingrediants"
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            onSubmit();
          }
        }}
        className={
          "mt-5 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-orange-200 focus:ring-orange-200 block w-full rounded-md sm:text-sm focus:ring-1"
        }
      />

      <button
        onClick={onSubmit}
        disabled={loading}
        className="bg-gradient-to-r mt-5 from-orange-300
        to-fuchsia-900 disabled:opacity-50 w-full p-2 rounded-md text-lg hover:text-white"
      >
        Submit
      </button>
    </>
  );
};

export default Form;
