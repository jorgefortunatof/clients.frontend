import React from "react";
import "./styles.scss";

const Home: React.FC = () => {
	return (
		<div className="homeContainer">
			<header>
				<h2>Cadastrar cliente</h2>

				<form>
					<input type="input" placeholder="Nome" />
					<input type="input" placeholder="Email" />
					<input type="input" placeholder="Cpf" />
					<button type="submit">Salvar</button>
				</form>
			</header>

			<main>
				<h2>Meus clientes</h2>

				<div className="noClientsYet">
					Você ainda não possui nenhum cliente cadastrado.
				</div>
			</main>
		</div>
	);
};

export default Home;
