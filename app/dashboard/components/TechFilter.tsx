import {
  faAws,
  faCss3Alt,
  faDocker,
  faGolang,
  faHtml5,
  faJava,
  faJs,
  faLaravel,
  faLinux,
  faNodeJs,
  faPhp,
  faPython,
  faReact,
  faRust,
  faSymfony,
  faVuejs,
  faWordpress,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./TechFilter.css";

export const TechFilter = () => {
  return (
    <div className="custom-scrollbar text-6xl mx-7  bg-gray-200 text-black dark:bg-inherit dark:text-white [&>*]:p-4 overflow-x-auto whitespace-nowrap">
      <FontAwesomeIcon icon={faReact} />
      <FontAwesomeIcon icon={faPython} />
      <FontAwesomeIcon icon={faWordpress} />
      <FontAwesomeIcon icon={faDocker} />
      <FontAwesomeIcon icon={faHtml5} />
      <FontAwesomeIcon icon={faLinux} />
      <FontAwesomeIcon icon={faJava} />
      <FontAwesomeIcon icon={faNodeJs} />
      <FontAwesomeIcon icon={faVuejs} />
      <FontAwesomeIcon icon={faSymfony} />
      <FontAwesomeIcon icon={faRust} />
      <FontAwesomeIcon icon={faPhp} />
      <FontAwesomeIcon icon={faLaravel} />
      <FontAwesomeIcon icon={faJs} />
      <FontAwesomeIcon icon={faGolang} />
      <FontAwesomeIcon icon={faRust} />
      <FontAwesomeIcon icon={faCss3Alt} />
      <FontAwesomeIcon icon={faAws} />
    </div>
  );
};
