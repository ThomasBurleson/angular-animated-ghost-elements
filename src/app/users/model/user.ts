
export interface User {
  id     : string;
  name   : string;
  email  : string;
  avatar?: string;

  company: {
    name : string;
  }
}