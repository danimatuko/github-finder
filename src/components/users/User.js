import React, { useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/githubContext";

const User = ({ match }) => {
	const githubContext = useContext(GithubContext);
	const { getUser, user, getUserRepos,repos } = githubContext;

	useEffect(() => {
		getUser(match.params.login);
		getUserRepos(match.params.login);
		// eslint-disable-next-line
	}, []);

	const {
		name,
		avatar_url,
		location,
		company,
		bio,
		blog,
		login,
		html_url,
		followers,
		following,
		public_gists,
		public_repos,
		hireable,
		loading
	} = user;

	if (loading) return <Spinner />;

	return (
		<Fragment>
			<Link to="/" className="btn btn-light">
				Back to search
			</Link>
			hireable:
			{hireable ? (
				<i className="fa fa-check text-success" />
			) : (
				<i className="fa fa-times text-danger" />
			)}
			<div className="card grid-2">
				<div className="all-center">
					<img
						src={avatar_url}
						alt=""
						className="round-img"
						style={{ width: "150px" }}
					/>
					<h1>{name}</h1>
					<p>Location: {location}</p>
				</div>
				<div>
					{bio && (
						<Fragment>
							<h3>Bio</h3>
							<p>{bio}</p>
						</Fragment>
					)}
					<a href={html_url} className="btn btn-dark my-1">
						Visit Github Profile
					</a>
					<ul>
						<li>
							{login && (
								<Fragment>
									<strong>Username : </strong> {login}
								</Fragment>
							)}
						</li>
						<li>
							{company && (
								<Fragment>
									<strong>Company : </strong>
									{company}
								</Fragment>
							)}
						</li>
						<li>
							{blog && (
								<Fragment>
									<strong>Website : </strong> {blog}
								</Fragment>
							)}
						</li>
					</ul>
				</div>
			</div>
			<div className="card rext-center">
				<div className="badge badge-primary">Following {following}</div>
				<div className="badge badge-success">Followers {followers}</div>
				<div className="badge badge-light">Public Gists {public_repos}</div>
				<div className="badge badge-dark">Public Repos {public_gists}</div>
			</div>
			<Repos repos={repos} />
		</Fragment>
	);
};

export default User;
