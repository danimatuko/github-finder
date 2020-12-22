import { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import githubReducer from "./githubReducer";
import {
	SEARCH_USERS,
	GET_USER,
	GET_REPOS,
	SET_LOADING,
	CLEAR_USERS
} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
	githubClientId = process.env.REACT_APP_CLIENT_ID;
	githubClientSecret = process.env.REACT_APP_CLIENT_SECRET;
} else {
	githubClientId = process.env.CLIENT_ID;
	githubClientSecret = process.env.CLIENT_SECRET;
}

const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false
	};

	const [state, dispatch] = useReducer(githubReducer, initialState);

	const searchUsers = async (text) => {
		setLoading();

		const users = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);

		dispatch({
			type: SEARCH_USERS,
			payload: users.data.items
		});
	};

	const getUser = async (userName) => {
		dispatch({ type: SET_LOADING });
		const user = await axios.get(
			`https://api.github.com/users/${userName}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);

		dispatch({
			type: GET_USER,
			payload: user.data
		});
	};

	const getUserRepos = async (userName) => {
		setLoading();

		const user = await axios.get(
			`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);

		dispatch({
			type: GET_REPOS,
			payload: user.data
		});
	};

	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUsers,
				clearUsers,
				getUser,
				getUserRepos
			}}>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
