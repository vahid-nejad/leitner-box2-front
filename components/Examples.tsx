import { Example } from "interfaces";
import React, { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { CardContex } from "./AddCard";

const Examples = () => {
  const { card, setCard } = useContext(CardContex);
  return (
    <div className="m-2">
      <TransitionGroup className="todo-list">
        {card!.examples &&
          card!.examples!.map((example) => (
            <CSSTransition
              key={example.id}
              timeout={300}
              classNames={"display"}
              unmountOnExit
            >
              <div className=" flex justify-between	border mb-2 bg-slate-50 rounded-md py-3 p-2 shadow-md">
                <p className="text-slate-500">{example.text}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500 active:scale-90 cursor-pointer transition hover:scale-105"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  onClick={() =>
                    setCard!({
                      ...card,
                      examples: [
                        ...card!.examples!.filter((e) => e.id !== example.id),
                      ],
                    })
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
  );
};

export default Examples;
