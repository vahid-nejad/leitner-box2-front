import Button from "@elements/Button";
import FileInput from "@elements/FileInput";
import TextBox from "@elements/TextBox";
import { Picture, QuestionCard } from "interfaces";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { patchApi, postApi, uploadImages } from "utils/fetchApi";
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

interface IProps {
  editingCard?: QuestionCard;
}

const AddCard = ({ editingCard }: IProps) => {
  let [card, setCard] = useState<QuestionCard>(
    editingCard
      ? editingCard
      : {
          pictures: [],
          examples: [],
        }
  );

  // useEffect(() => {
  //   if (editingCard) {
  //     reset({
  //       question: editingCard.question,
  //       answer: editingCard.answer,
  //       synonym: editingCard.synonym,
  //     });
  //   }
  // }, []);
  const [example, setExample] = React.useState<string>("");
  const deletedImages = useRef<string[]>([]);
  const addedImages = useRef<Picture[]>([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  function addExample() {
    console.log("here");

    if (!example) return;

    console.log("after if");

    card.examples!.push({ text: example, id: new Date().getTime() });
    setCard!(card);

    setExample("");
  }

  async function edit(data: Inputs) {
    const uploadRes = await uploadImages(
      addedImages.current.map((img) => img.file)
    );
    const { images } = uploadRes;

    const updatedPics = card.pictures
      ? card.pictures.map((pic) => {
          return {
            id: pic.id,
            url: pic.url,
          };
        })
      : [];
    updatedPics.concat(
      images
        ? images.map((img: any) => {
            return { url: img };
          })
        : []
    );
    console.log({ updatedPics });

    const res = await patchApi(`/card/${card?.id}`, {
      question: data.question,
      answer: data.answer,
      synonym: data.synonym,
      examples: card.examples
        ? card.examples!.map((ex) => {
            return { text: ex.text };
          })
        : [],

      pictures: updatedPics,
    });
  }

  async function add(data: Inputs) {
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
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (example) addExample();
    console.log({ editingCard });

    if (editingCard) {
      await edit(data);
    } else {
      await add(data);
    }

    alert("success");
    clearForm();
  };

  function clearForm() {
    reset();
    setCard({ examples: [], pictures: [] });
    if (editingCard) {
      editingCard = undefined;
      router.push("/");
    }
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
                defaultValue={editingCard ? editingCard.question : ""}
                error={errors.question && "Question is required"}
              ></TextBox>
              <AddExample
                example={example}
                setExample={setExample}
                onAdd={addExample}
              />
            </div>
            <div id="RightSide">
              <TextBox
                lableText="Answer"
                className={"m-2 " + (errors.answer && "animate-shake")}
                {...register("answer", { required: true })}
                defaultValue={editingCard ? editingCard.answer : ""}
                error={errors.answer && "Answer is required"}
              ></TextBox>
              <TextBox
                lableText="Synonyms"
                className={"m-2 "}
                {...register("synonym")}
                defaultValue={editingCard ? editingCard.synonym : ""}
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
            {editingCard ? "Update" : "Add"}
          </Button>
        </form>
        {card.pictures && (
          <ImageSet
            onRemove={(id) => removeImage(id)}
            images={card.pictures!}
            isEditting={editingCard ? true : false}
          ></ImageSet>
        )}
      </div>
    </CardContex.Provider>
  );
};

export default AddCard;
