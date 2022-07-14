import Button from "@elements/Button";
import FileInput from "@elements/FileInput";
import TextArea from "@elements/TextArea";
import TextBox from "@elements/TextBox";
import ToolTip from "@elements/ToolTip";
import {
  PencilIcon,
  SpeakerphoneIcon,
  SwitchVerticalIcon,
} from "@heroicons/react/solid";
import { Picture, QuestionCard } from "interfaces";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getApi, patchApi, postApi, uploadImages } from "utils/fetchApi";
import { playPronounciation } from "utils/utillties";
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
  const [duplicationResult, setDuplicationResult] = React.useState<{
    isDuplicate: boolean;
    id: number;
  }>({ isDuplicate: false, id: 0 });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
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
    const addedImages = card.pictures
      ?.filter((img) => img.file)
      .map((img) => img.file);
    const uploadRes = await uploadImages(addedImages ? addedImages : []);
    const { images } = uploadRes;

    const updatedPics = card.pictures
      ? card.pictures
          .filter((img) => !img.file)
          .map((pic) => {
            return {
              id: pic.id,
              url: pic.url,
            };
          })
      : [];

    images.forEach((imgUrl: string) => {
      updatedPics.push({ id: undefined, url: imgUrl });
    });
    console.log(
      "images",
      images.map((img: string) => {
        return { url: img };
      })
    );

    const res = await patchApi(`/card/${card?.id}`, {
      question: data.question.toLocaleLowerCase().trim(),
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
      question: data.question.toLocaleLowerCase().trim(),
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
    reset({
      question: "",
      answer: "",
      synonym: "",
    });

    setCard({ examples: [], pictures: [] });
    if (editingCard) {
      editingCard = undefined;
      router.push("/");
    }
  }
  function addImage(imageFiles: FileList) {
    const images: Picture[] = Array.from(imageFiles).map((file, index) => ({
      id: new Date().getTime() + index,
      url: URL.createObjectURL(file),
      file: file,
    }));

    setCard({ ...card, pictures: [...card.pictures!, ...images] });
    console.log(card);
  }

  function removeImage(id: number) {
    setCard({
      ...card,
      pictures: card.pictures!.filter((img) => img.id !== id),
    });
  }

  async function checkForDuplication() {
    const result = await getApi(
      `/card/checkForDuplication/${getValues().question.toLowerCase().trim()}`
    );
    setDuplicationResult(result);
  }

  function exchange() {
    const { question, answer, synonym } = getValues();
    reset({
      question: question,
      answer: synonym,
      synonym: answer,
    });
  }

  return (
    <CardContex.Provider value={{ card, setCard }}>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) =>
            e.key === "Enter" && !e.shiftKey && e.preventDefault()
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div id="leftSide">
              <TextBox
                lableText="Question"
                className={"m-2 " + (errors.question && "animate-shake")}
                {...register("question", { required: true })}
                defaultValue={editingCard ? editingCard.question : ""}
                error={errors.question && "Question is required"}
                onBlur={() => !editingCard && checkForDuplication()}
              >
                <SpeakerphoneIcon
                  onClick={() => playPronounciation(getValues().question)}
                  className="w-4 text-fuchsia-600 cursor-pointer"
                />
              </TextBox>
              {duplicationResult.isDuplicate && (
                <div className="m-2 flex">
                  <p className="text-red-600 mr-2">Question already exists</p>
                  <p
                    className="text-red-600 hover:text-blue-600 cursor-pointer flex items-center"
                    onClick={() => router.push(`/edit/${duplicationResult.id}`)}
                  >
                    Edit Question
                    <PencilIcon className="h-4 w-4 ml-2" />
                  </p>
                </div>
              )}
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
              >
                <SwitchVerticalIcon
                  onClick={exchange}
                  className="w-4 cursor-pointer text-violet-600"
                />
              </TextBox>
              <TextArea
                lableText="Synonyms"
                className={"m-2 "}
                {...register("synonym")}
                defaultValue={editingCard ? editingCard.synonym : ""}
                rows={3}
                cols={50}
              ></TextArea>
              <FileInput
                className="m-2"
                onChange={(e) => e.target.files && addImage(e.target.files)}
                lablText="Choose Image"
                multiple={true}
              ></FileInput>
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
