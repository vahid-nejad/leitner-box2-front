import Button from "@elements/Button";
import FileInput from "@elements/FileInput";
import TextBox from "@elements/TextBox";
import { Picture, QuestionCard } from "interfaces";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { postApi, uploadImages } from "utils/fetchApi";
import AddExample from "./AddExample";
import ImageSet from "./ImageSet";

interface IContex {
  card?: QuestionCard;
  setCard?: (card: QuestionCard) => void;
}

export const CardContex = React.createContext<IContex>({});

interface Inputs {
  question: string;
  answer: string;
  synonym: string;
}

const AddCard = () => {
  const [card, setCard] = useState<QuestionCard>({
    pictures: [],
    examples: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const uploadRes = await uploadImages(
      card.pictures ? card.pictures.map((img) => img.file) : []
    );

    const { images } = uploadRes;

    const res = await postApi("/card", {
      question: data.question,
      answer: data.answer,
      synonym: data.synonym,
      examples: card.examples
        ? card.examples!.map((ex) => {
            return { text: ex.text };
          })
        : [],

      pictures: images
        ? images.map((img: any) => {
            return { url: img };
          })
        : [],
    });

    alert("success");
    clearForm();
  };

  function clearForm() {
    reset();
    setCard({});
  }
  function addImage(imageFile: any) {
    const image: Picture = {
      id: new Date().getTime(),
      url: URL.createObjectURL(imageFile),
      file: imageFile,
    };

    setCard({ ...card, pictures: [...card.pictures!, image] });
    console.log(card);
  }

  function removeImage(id: number) {
    setCard({
      ...card,
      pictures: card.pictures!.filter((img) => img.id !== id),
    });
  }

  return (
    <CardContex.Provider value={{ card, setCard }}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div id="leftSide">
              <TextBox
                lableText="Question"
                className={"m-2 " + (errors.question && "animate-shake")}
                {...register("question", { required: true })}
                error={errors.question && "Question is required"}
              ></TextBox>
              <AddExample />
            </div>
            <div id="RightSide">
              <TextBox
                lableText="Answer"
                className={"m-2 " + (errors.answer && "animate-shake")}
                {...register("answer", { required: true })}
                error={errors.answer && "Answer is required"}
              ></TextBox>
              <TextBox
                lableText="Synonyms"
                className={"m-2 "}
                {...register("synonym")}
              ></TextBox>
              <FileInput
                className="m-2"
                onChange={(e) => e.target.files && addImage(e.target.files[0])}
                lablText="Choose Image"
              ></FileInput>
              {/* <FileInput
                className="m-2"
                onChange={(e) =>
                  e.target.files && pronounceChanged(e.target.files[0])
                }
                lablText="Choose Pronounciation"
              ></FileInput> */}
              {/* <Button
                type="button"
                onClick={playPronounciation}
                className="m-2"
              >
                Play Pronounciation
              </Button> */}
            </div>
          </div>

          <Button type="submit" className="m-3">
            Add
          </Button>
        </form>
        {card.pictures && (
          <ImageSet
            onRemove={(id) => removeImage(id)}
            images={card.pictures!}
          ></ImageSet>
        )}
      </div>
    </CardContex.Provider>
  );
};

export default AddCard;
