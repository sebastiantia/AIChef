import { strictEqual } from "assert";
import { renderToHTML } from "next/dist/server/render";
import { saveAs } from "file-saver";

interface ResultProps {
  recipe: string;
  setshowResult: any;
  onBack: any;
  prompt: string;
}

const Result: React.FC<ResultProps> = ({ recipe, prompt, onBack }) => {
  let lines = recipe.split("\n");

  const FileSave = (prompt: { prompt: string; }, recipe : any) => {
    console.log(prompt)
    console.log(recipe)
    var FileSaver = require("file-saver");
    var blob = new Blob([recipe.recipe], {
      type: "text/plain;charset=utf-8",
    });
    FileSaver.saveAs(blob, `${prompt.prompt}.txt`);
  };

  return (
    <>
      <div className="bg-neutral-300 rounded-md p-2">
        <div>
          <div className="mb-6 p-2">
            Prompt:
            <button className="float-right" onClick={() => {
              FileSave({prompt}, {recipe})
            }}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>{" "}
            </button>
            <div className="text-lg font-bold">{prompt}</div>{" "}
          </div>
        </div>
      </div>
      <div className="bg-neutral-300 rounded-md mt-4 p-2">
        <div className="font-bold p-2">Recipe: </div>
        <div className="p-2">
          {lines.map((line) => {
            if (line == "Instructions") {
              return <div className="font-bold">{line}</div>;
            }
            return <div>{line}</div>;
          })}
        </div>
      </div>

      <button
        onClick={onBack}
        className="bg-gradient-to-r mt-5 from-teal-400
        to-fuchsia-900 disabled:opacity-50 w-full p-2 rounded-md text-lg hover:text-white"
      >
        Back
      </button>
    </>
  );
};

export default Result;
