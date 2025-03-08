const REGION = "us-east-2";
const GATEWAY = "";
const GATEWAY_PRODUCT = "m9o1j9daj2";
const GATEWAY_IMPORT = "fr59ltuh83";

const API_PATHS = {
  product: `https://${GATEWAY_PRODUCT}.execute-api.${REGION}.amazonaws.com/dev`,
  order: `https://${GATEWAY}.execute-api.${REGION}.amazonaws.com/dev`,
  import: `https://${GATEWAY_IMPORT}.execute-api.${REGION}.amazonaws.com/dev`,
  bff: `https://${GATEWAY}.execute-api.${REGION}.amazonaws.com/dev`,
  cart: `https://${GATEWAY}.execute-api.${REGION}.amazonaws.com/dev`,
};

export default API_PATHS;
