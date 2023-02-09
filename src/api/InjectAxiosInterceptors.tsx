import { FC, useEffect } from "react";
import { setupInterceptors } from "./api.service";

const InjectAxiosInterceptors: FC = () => {
  useEffect(() => {
    console.log("this effect should be called once");
    setupInterceptors();
  }, []);
  return null;
};

export default InjectAxiosInterceptors;
