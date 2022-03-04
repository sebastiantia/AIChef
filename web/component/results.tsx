import { strictEqual } from "assert";
import { renderToHTML } from "next/dist/server/render";

interface ResultProps {
  recipe: string;
  setshowResult: any;
  onBack: any;
  prompt: string;
}

const Result: React.FC<ResultProps> = ({ recipe, prompt, onBack }) => {
  let lines = recipe.split("\n");

  return (
    <>
    <div className="bg-neutral-300 rounded-md p-2">
    <div className="mb-6 p-2">
        Prompt:
        <div className="text-lg font-bold">{prompt}</div>{" "}
      </div>
    </div>
    <div className="bg-neutral-300 rounded-md mt-4 p-2">
      <div className="font-bold p-2">Recipe: </div>
      <div className="p-2">
        {lines.map((line) => {
          if(line == "Instructions"){
            return <div className="font-bold">{line}</div>
          }
          return <div>{line}</div>;
        })}
      </div>
      </div>

      <button
        onClick={onBack}
        className="bg-gradient-to-r mt-5 from-orange-300
        to-fuchsia-900 disabled:opacity-50 w-full p-2 rounded-md text-lg hover:text-white"
      >
        Back
      </button>
    </>
  );
};

export default Result;
