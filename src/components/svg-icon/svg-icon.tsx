import { ReactComponent as TurtleIcon } from "../../assets/turtle.svg";
import { ReactComponent as CatIcon } from "../../assets/cat.svg";
import { ReactComponent as DogIcon } from "../../assets/dog.svg";
import { ReactComponent as RabbitIcon } from "../../assets/rabbit.svg";
import { ReactComponent as ReptileIcon } from "../../assets/reptile.svg";
import { ReactComponent as BirdIcon } from "../../assets/bird.svg";
import { ReactComponent as QuestionMark } from "../../assets/question-mark.svg";

const SVGIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "cat":
      return <CatIcon />;
    case "dog":
      return <DogIcon />;
    case "bird":
      return <BirdIcon />;
    case "rabbit":
      return <RabbitIcon />;
    case "reptile":
      return <ReptileIcon />;
    case "turtle":
      return <TurtleIcon />;
    case "question-mark":
      return <QuestionMark />;
    default:
      return null;
  }
};

export default SVGIcon;
