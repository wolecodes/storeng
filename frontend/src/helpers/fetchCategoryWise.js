const { default: apiSummary } = require("../common");

const fetchCategoryWiseProduct = async (category) => {
  const response = await fetch(apiSummary.categoryWiseProduct.url, {
    method: apiSummary.categoryWiseProduct.method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      category: category,
    }),
  });

  const data = await response.json();

  return data;
};

export default fetchCategoryWiseProduct;
