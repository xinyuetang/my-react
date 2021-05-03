export const jsonToFormData = (params) => {
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key]);
  });
  return formData;
};

export const postFetch = ({ url, values, successCallback, errorCallback, type = 'POST' }) => {
  fetch(url, {
    method: type,
    body: values ? jsonToFormData(values) : {},
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      if (response.success) {
        successCallback && successCallback();
      } else {
        errorCallback && errorCallback();
      }
    });
};