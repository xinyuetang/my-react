export const jsonToFormData = (params) => {
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key]);
  });
  return formData;
};

// export const formFetch = ({
//   url,
//   values,
//   successCallback,
//   errorCallback,
//   type = "POST",
// }) => {
//   fetch(url, {
//     method: type,
//     body: values ? jsonToFormData(values) : {},
//   })
//     .then((res) => res.json())
//     .catch((error) => console.error("Error:", error))
//     .then((response) => {
//       if (response.success) {
//         successCallback && successCallback();
//       } else {
//         errorCallback && errorCallback();
//       }
//     });
// };

export const deleteFetch = ({ url, successCallback }) => {
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      alert(response?.success ? "删除成功" : response?.msg || "删除失败");
      successCallback && successCallback();
    });
};

export const formFetch = ({
  url,
  values = {},
  successCallback,
  errorCallback,
  type = "POST",
}) => {
  fetch(url, {
    method: type,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify(values),
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      if (response?.success) {
        successCallback && successCallback();
      } else {
        alert(response?.msg || "操作失败");
        errorCallback && errorCallback();
      }
    });
};

export const postFetch = ({ url, values = {}, successCallback, errorCallback, type = 'POST' }) => {
  fetch(url, {
    method: type,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      if (response?.success) {
        successCallback && successCallback();
      } else {
        alert(response?.msg || '操作失败');
        errorCallback && errorCallback();
      }
    });
};