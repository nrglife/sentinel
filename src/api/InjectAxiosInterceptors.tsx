import { FC, useEffect } from "react";
import { setupInterceptors } from "./api.service";

const InjectAxiosInterceptors: FC = () => {
  useEffect(() => {
    console.log("this effect is called once");
    setupInterceptors();
  }, []);
  return null;
};

export default InjectAxiosInterceptors;
