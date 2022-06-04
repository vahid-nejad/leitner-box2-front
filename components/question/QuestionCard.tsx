import React, { useEffect } from "react";
import Question from "./Question";
import { AnswerChoice, QuestionCard as IQuestionCard } from "interfaces";
import { getApi, patchApi } from "utils/fetchApi";
import ExampleSet from "./ExampleSet";
import AnswerBox from "./AnswerBox";
import { css } from "@emotion/css";
import ImageSet from "components/ImageSet";
import Result from "./Result";
import { Transition } from "@headlessui/react";

const styles = {
  card: css`
    perspective: 1000px;
  `,
};

const QuestionCard = () => {
  let [pot, setPot] = React.useState<number>(0);
  let [card, setCard] = React.useState<IQuestionCard>({
    examples: [],
    pictures: [],
  });
  const [reveal, setReveal] = React.useState(false);
  let [choices, setChoices] = React.useState<AnswerChoice[]>([]);
  const [selectedChoice, setSelectedChoice] = React.useState<AnswerChoice>();
  const [show, setShow] = React.useState(false);
  const [wordInPot, setWordInPot] = React.useState<number>(0);

  useEffect(() => {
    fetchNextWord();
  }, []);

  async function fetchNextWord() {
    const res = await getApi(`/card/${pot}`);

    if (!res.card) {
      alert("No more cards");
      return;
    }
    card = res.card;

    choices = [
      { text: card.answer, isCorrect: true },
      ...res.wrongAnswers.map((el: any) => ({
        text: el.answer,
        isCorrect: false,
      })),
    ];
    setChoices(choices.sort(() => Math.random() - 0.5));
    setCard(card);
    setPot(card.pot!);
    setWordInPot(res.wordInPot);
    setSelectedChoice(undefined);
  }

  function updatePot(pot: number) {
    console.log("updatePot", pot);
    const res = patchApi(`/card/${card.id}`, {
      pot: pot,
    });
  }

  function answerSeleted(selectedChoice: AnswerChoice) {
    if (selectedChoice.isCorrect) {
      pot === 0 ? (pot += 2) : (pot += 1);
    } else {
      pot = 1;
    }

    updatePot(pot);
    setPot(pot);
    setSelectedChoice(selectedChoice);
  }

  async function nextWord() {
    setReveal(false);
    await fetchNextWord();
  }
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-2">
        <div id="leftSide">
          <Question questionText={card.question!} onNextCard={nextWord} />
          <ExampleSet examples={card.examples!} />
          <div className="text-cyan-600 rounded-md shadow border p-2 mt-2 flex justify-between">
            <p>
              Pot <span>{card.pot}</span>
            </p>
            <p>
              <span>{wordInPot}</span> word{wordInPot > 1 ? "s" : ""} in the pot{" "}
            </p>
          </div>
        </div>
        <div id="RightSide" className={styles.card + " relative w-full "}>
          <div
            id="front side"
            className={
              "backface-visibility-hidden transition duration-700   absolute w-full " +
              (reveal ? "-rotateY-180 delay-500" : "")
            }
          >
            <AnswerBox
              onSelect={(selectedChoice) => answerSeleted(selectedChoice)}
              choices={choices}
              reveal={reveal}
              setReveal={setReveal}
            ></AnswerBox>
          </div>
          <div
            id="back side"
            className={
              "backface-visibility-hidden transition  duration-700 absolute w-full " +
              (reveal ? "rotateY-0  delay-500" : "rotateY-180")
            }
          >
            {selectedChoice && (
              <Result
                correctAnswer={card.answer!}
                isCorrect={selectedChoice.isCorrect}
                selectedChoice={selectedChoice.text}
                synonym={card.synonym}
                pot={pot}
                onNext={nextWord}
              />
            )}
          </div>
        </div>
      </div>

      {reveal && <ImageSet images={card.pictures!}></ImageSet>}
    </div>
  );
};

export default QuestionCard;
