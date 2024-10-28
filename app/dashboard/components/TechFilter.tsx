import { useEffect, useState } from "react";

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

import { useDataContext } from "@/context";

import "./TechFilter.css";

export const TechFilter = () => {
  const { records, setFilteredData } = useDataContext();
  const [searchField, setSearchField] = useState("");
  useEffect(() => {
    const filteredTech = records.filter((record) => {
      return record.technologies.toLowerCase().includes(searchField);
    });
    setFilteredData(filteredTech);
    console.log(searchField);
  }, [searchField]);

  return (
    <div className="custom-scrollbar text-6xl mx-7  bg-gray-200 text-black dark:bg-inherit dark:text-white [&>*]:p-4 overflow-x-auto whitespace-nowrap">
      <FontAwesomeIcon
        icon={faReact}
        onClick={() => {
          setSearchField("react");
        }}
      />
      <FontAwesomeIcon
        icon={faPython}
        onClick={() => {
          setSearchField("python");
        }}
      />
      <FontAwesomeIcon
        icon={faWordpress}
        onClick={() => {
          setSearchField("wordpress");
        }}
      />
      <FontAwesomeIcon
        icon={faDocker}
        onClick={() => {
          setSearchField("docker");
        }}
      />
      <FontAwesomeIcon
        icon={faHtml5}
        onClick={() => {
          setSearchField("html");
        }}
      />
      <FontAwesomeIcon
        icon={faLinux}
        onClick={() => {
          setSearchField("linux");
        }}
      />
      <FontAwesomeIcon
        icon={faJava}
        onClick={() => {
          setSearchField("java");
        }}
      />
      <FontAwesomeIcon
        icon={faNodeJs}
        onClick={() => {
          setSearchField("node");
        }}
      />
      <FontAwesomeIcon
        icon={faVuejs}
        onClick={() => {
          setSearchField("vue");
        }}
      />
      <FontAwesomeIcon
        icon={faSymfony}
        onClick={() => {
          setSearchField("symfony");
        }}
      />
      <FontAwesomeIcon
        icon={faRust}
        onClick={() => {
          setSearchField("rust");
        }}
      />
      <FontAwesomeIcon
        icon={faPhp}
        onClick={() => {
          setSearchField("php");
        }}
      />
      <FontAwesomeIcon
        icon={faLaravel}
        onClick={() => {
          setSearchField("laravel");
        }}
      />
      <FontAwesomeIcon
        icon={faJs}
        onClick={() => {
          setSearchField("javascript");
        }}
      />
      <FontAwesomeIcon
        icon={faGolang}
        onClick={() => {
          setSearchField("golang");
        }}
      />
      <FontAwesomeIcon
        icon={faRust}
        onClick={() => {
          setSearchField("rust");
        }}
      />
      <FontAwesomeIcon
        icon={faCss3Alt}
        onClick={() => {
          setSearchField("css");
        }}
      />
      <FontAwesomeIcon
        icon={faAws}
        onClick={() => {
          setSearchField("aws");
        }}
      />
    </div>
  );
};
