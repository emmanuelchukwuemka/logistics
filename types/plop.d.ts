declare module "plop" {
  export interface NodePlopAPI {
    setGenerator: (name: string, config: any) => void;
    // Add more methods here if you need them
  }
  const plop: any;
  export default plop;
}
