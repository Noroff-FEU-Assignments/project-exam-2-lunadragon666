import PropTypes from "prop-types";
import useAxios from "../../../../../hooks/useAxios";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export default function DeleteMessage({ id }) {
	const [error, setError] = useState(null);

	const http = useAxios();
	const history = useHistory();

	const url = `/contacts/${id}`;

	async function handleDelete() {
        const confirmDelete = window.confirm("Delete this message?");

        if (confirmDelete) {
		try {
			await http.delete(url);
			history.push("/dashboard");
		} catch (error) {
			setError(error);
		}
	  }
    }

	return (
		<button type="button" className="delbtn" onClick={handleDelete}>
			{error ? "Error" : "Delete"}
		</button>
	);
}

DeleteMessage.propTypes = {
	id: PropTypes.number.isRequired,
};
