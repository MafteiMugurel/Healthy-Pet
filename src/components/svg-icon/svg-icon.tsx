import { ReactComponent as TurtleIcon } from "../../assets/turtle.svg";
import { ReactComponent as CakeIcon } from "../../assets/cake.svg";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { ReactComponent as BellIcon } from "../../assets/bell.svg";
import { ReactComponent as CatIcon } from "../../assets/cat.svg";
import { ReactComponent as DogIcon } from "../../assets/dog.svg";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { ReactComponent as RabbitIcon } from "../../assets/rabbit.svg";
import { ReactComponent as ReptileIcon } from "../../assets/reptile.svg";
import { ReactComponent as BirdIcon } from "../../assets/bird.svg";
import { ReactComponent as QuestionMark } from "../../assets/question-mark.svg";
import { ReactComponent as SyringeIcon } from "../../assets/syringe.svg";
import { ReactComponent as DocumentIcon } from "../../assets/document.svg";
import { ReactComponent as DropIcon } from "../../assets/drop.svg";

const SVGIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "cake":
      return <CakeIcon />;
    case "calendar":
      return <CalendarIcon />;
    case "bell":
      return <BellIcon />;
    case "plus":
      return <PlusIcon />;
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
    case "syringe":
      return <SyringeIcon />;
    case "document":
      return <DocumentIcon />;
    case "drop":
      return <DropIcon />;
    default:
      return null;
  }
};

export default SVGIcon;
