import { useState } from "react";

const NewUser = () => {
	const [nombreUsuario, setNombreUsuario] = useState("");
	const [contraseña, setContraseña] = useState("");
	let user = { name: nombreUsuario, password: contraseña };

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={nombreUsuario}
					onChange={(e) => setNombreUsuario(e.target.value)}
				/>

				<input
					type="password"
					value={contraseña}
					onChange={(e) => e.target.value}
				/>
			</form>
		</>
	);
};

export default NewUser;
