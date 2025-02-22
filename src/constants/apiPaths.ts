const REGION = "us-east-2";
const GATEWAY = "m9o1j9daj2";

const API_PATHS = {
  product: `https://${GATEWAY}.execute-api.${REGION}.amazonaws.com/dev`,
  order: `https://${GATEWAY}.execute-api.${REGION}.amazonaws.com/dev`,
  import: `https://${GATEWAY}.execute-api.${REGION}.amazonaws.com/dev`,
  bff: `https://${GATEWAY}.execute-api.${REGION}.amazonaws.com/dev`,
  cart: `https://${GATEWAY}.execute-api.${REGION}.amazonaws.com/dev`,
};

export default API_PATHS;
