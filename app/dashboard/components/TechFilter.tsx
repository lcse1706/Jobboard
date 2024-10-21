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

export const TechFilter = () => {
  return (
    <div>
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
