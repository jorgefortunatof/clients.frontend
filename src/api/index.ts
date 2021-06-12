import axios from "axios";

const Api = axios.create({
	baseURL: "http://localhost:3333",
});

Api.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (error.response.status === 400) {
			alert(error.response?.data?.message);
		}
		console.log(error.response);
		return Promise.reject(error);
	}
);

export default Api;
