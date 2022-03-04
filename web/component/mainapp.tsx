import React, { useState } from "react";
import { domainToASCII } from "url";
import Form from "./form";
import Result from "./results";

const MainApp: React.FC = () => {
  const ENDPOINT: string =
    "https://tmi3nlsnib.execute-api.us-east-1.amazonaws.com/prod/generate_snippet";

  const [prompt, setPrompt] = React.useState("");
  const [recipe, setRecipe] = React.useState("");
  const [showResult, setshowResult] = React.useState(false);
  const [loading, setloading] = React.useState(false);

  const onSubmit = async () => {
    setloading(true);
    console.log("Submitting form");
    await fetch(`${ENDPOINT}?prompt=${prompt}`)
      .then((res) => res.json())
      .then(onResult)
      .catch((e) => {
        console.log(e);
      });

    setshowResult(true);
  };

  const onResult = (data: any) => {
    setRecipe(data.snippet);
    console.log("IN main app:", data);
    setloading(false);
  };

  const onReset = () => {
    setPrompt("");
    setshowResult(false);
    setloading(false);
  };
  const gradientTextStyle =
    "text-white text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-fuchsia-900 font-light w-fit mx-auto";

  return (
    <>
      <div className="h-screen flex">
        <div className="max-w-xlg m-auto p-6 ">
          <div className="bg-neutral-400 p-10 rounded-md">
            <img className="max-h-14 block m-auto " src="./chef.png" />
            <h1 className={gradientTextStyle + " text-7xl text-center"}>
              AIChef
            </h1>
            <div className={gradientTextStyle + " text-l text-center "}>Your AI chef assistant</div>
            <div className="mt-3 ">
              {!showResult ? (
                <Form
                  onSubmit={onSubmit}
                  prompt={prompt}
                  setPrompt={setPrompt}
                  loading={loading}
                />
              ) : (
                <Result
                  recipe={recipe}
                  setshowResult={setshowResult}
                  prompt={prompt}
                  onBack={onReset}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainApp;
