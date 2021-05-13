import alertBox from "src/components/AlertBox";

export const jsonToFormData = (params) => {
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key]);
  });
  return formData;
};

export const jsonToUrlencoded = (params) => {
  const urlSearchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    urlSearchParams.append(key, params[key]);
  });
  return urlSearchParams;
};

export const formDataFetch = ({
  url,
  values,
  successCallback,
  errorCallback,
  type = "POST",
}) => {
  fetch(url, {
    method: type,
    body: jsonToFormData(values),
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      if (response?.success) {
        successCallback && successCallback();
      } else {
        errorCallback && errorCallback();
      }
    });
};

export const formUrlencodedFetch = ({
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
    body: jsonToUrlencoded(values),
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      if (response?.success) {
        successCallback && successCallback();
      } else {
        // alert(response?.msg || "操作失败")
        alertBox({ text: response?.msg || "操作失败", severity: "error" });
        errorCallback && errorCallback();
      }
    });
};

export const postFetch = ({
  url,
  values = {},
  successCallback,
  errorCallback,
  type = "POST",
}) => {
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
        // alert(response?.msg || "操作失败");
        alertBox({ text: response?.msg || "操作失败", severity: "error" });
        errorCallback && errorCallback();
      }
    });
};

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
      // alert(response?.success ? "删除成功" : response?.msg || "删除失败");
      alertBox({
        text: response?.success ? "删除成功" : response?.msg || "删除失败",
        severity: "error",
      });
      successCallback && successCallback();
    });
};
