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
  const { records, setTechFilteredData } = useDataContext();
  const [activeTech, setActiveTech] = useState("");

  useEffect(() => {
    const filteredTech = records.filter((record) => {
      return (
        record.title.toLowerCase().includes(activeTech) ||
        record.technologies.toLowerCase().includes(activeTech) ||
        record.description.toLowerCase().includes(activeTech)
      );
    });
    setTechFilteredData(filteredTech);
  }, [activeTech, records]);

  const filterHandler = (tech: string) => {
    setActiveTech((prevTech) => (prevTech === tech ? "" : tech));
  };

  return (
    <div className="custom-scrollbar text-6xl bg-gray-200 text-black dark:bg-inherit dark:text-white [&>*]:m-4 [&>*]:cursor-pointer overflow-x-auto whitespace-nowrap">
      <FontAwesomeIcon
        icon={faJs}
        onClick={() => {
          filterHandler("javascript");
        }}
        className={`${activeTech === "javascript" ? "text-blue-500" : ""}`}
      />
      <FontAwesomeIcon
        icon={faReact}
        onClick={() => filterHandler("react")}
        className={`${activeTech === "react" ? "text-blue-500" : ""}`}
      />
      <FontAwesomeIcon
        icon={faVuejs}
        onClick={() => {
          filterHandler("vue");
        }}
        className={`${activeTech === "vue" ? "text-blue-500" : ""}`}
      />
      <FontAwesomeIcon
        icon={faNodeJs}
        onClick={() => {
          filterHandler("node");
        }}
        className={`${activeTech === "node" ? "text-blue-500" : ""}`}
      />
      <FontAwesomeIcon
        icon={faPython}
        onClick={() => {
          filterHandler("python");
        }}
        className={`${activeTech === "python" ? "text-blue-500" : ""}`}
      />
      <FontAwesomeIcon
        icon={faWordpress}
        onClick={() => {
          filterHandler("wordpress");
        }}
        className={`${activeTech === "wordpress" ? "text-blue-500" : ""}`}
      />
      <FontAwesomeIcon
        icon={faDocker}
        onClick={() => {
          filterHandler("docker");
        }}
        className={`${activeTech === "docker" ? "text-blue-500" : ""}`}
      />
      <FontAwesomeIcon
        icon={faHtml5}
        onClick={() => {
          filterHandler("html");
        }}
        className={`${activeTech === "html" ? "text-blue-500" : ""}`}
      />
      <FontAwesomeIcon
        icon={faCss3Alt}
        onClick={() => {
          filterHandler("css");
        }}
        className={`${activeTech === "css" ? "text-blue-500" : ""}`}
      />
      <FontAwesomeIcon
        icon={faLinux}
        onClick={() => {
          filterHandler("linux");
        }}
        className={`${activeTech === "linux" ? "text-blue-500" : ""}`}
      />
      <FontAwesomeIcon
        icon={faJava}
        onClick={() => {
          filterHandler("java");
        }}
        className={`${activeTech === "java" ? "text-blue-500" : ""}`}
      />
      <FontAwesomeIcon
        icon={faSymfony}
        onClick={() => {
          filterHandler("symfony");
        }}
        className={`${activeTech === "symfony" ? "text-blue-500" : ""}`}
      />

      <FontAwesomeIcon
        icon={faPhp}
        onClick={() => {
          filterHandler("php");
        }}
        className={`${activeTech === "php" ? "text-blue-500" : ""}`}
      />
      <FontAwesomeIcon
        icon={faLaravel}
        onClick={() => {
          filterHandler("laravel");
        }}
        className={`${activeTech === "laravel" ? "text-blue-500" : ""}`}
      />
      <FontAwesomeIcon
        icon={faGolang}
        onClick={() => {
          filterHandler("golang");
        }}
        className={`${activeTech === "golang" ? "text-blue-500" : ""}`}
      />
      <FontAwesomeIcon
        icon={faRust}
        onClick={() => {
          filterHandler("rust");
        }}
        className={`${activeTech === "rust" ? "text-blue-500" : ""}`}
      />

      <FontAwesomeIcon
        icon={faAws}
        onClick={() => {
          filterHandler("aws");
        }}
        className={`${activeTech === "aws" ? "text-blue-500" : ""}`}
      />
    </div>
  );
};
