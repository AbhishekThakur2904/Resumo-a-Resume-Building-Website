declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface User {
  _id: string;
  [key: string]: string;
}

interface ApiError {
  status: number; // HTTP status code
  data: {
    message?: string; // Optional message from the API
  };
}
