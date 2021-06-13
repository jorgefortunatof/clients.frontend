import React, { useCallback, useEffect, useState } from "react";

import "./styles.scss";

import Client from "../../components/Client";
import Api from "../../api";

type PhoneType = {
	number: string;

	phoneType: {
		type: string;
		whatsapp: boolean;
	};
};

type ClientType = {
	id: number;
	name: string;
	email: string;
	cpf: string;

	phones?: PhoneType[];
};

const Home: React.FC = () => {
	const [id, setId] = useState(0);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [cpf, setCpf] = useState("");

	const [clientToEdit, setClientToEdit] = useState({} as ClientType);
	const [clients, setClients] = useState<ClientType[]>([]);

	const getClients = useCallback(async () => {
		const { data }: { data: ClientType[] } = await Api.get("client");

		console.log(data);

		if (data) {
			setClients(data);
		}
	}, [setClients]);

	const toggleSaveClient = useCallback(
		async (event: any) => {
			event.preventDefault();

			if (!email.trim() || !name.trim() || !cpf.trim()) {
				return alert("Preencha todos os campos!");
			}

			if (id) {
				await Api.put(`/client/${id}`, {
					name,
					email,
					cpf,
				});
			} else {
				await Api.post("/client", {
					name,
					email,
					cpf,
				});
			}
			getClients();

			setId(0);
			setName("");
			setEmail("");
			setCpf("");
		},
		[id, name, email, cpf, getClients]
	);

	const toggleAddPhone = useCallback(
		async (id: number, number: string, type: string, whatsapp: boolean) => {
			await Api.post(`/client/${id}/phone`, {
				phones: [
					{
						number,
						type,
						whatsapp,
					},
				],
			});

			getClients();
		},
		[getClients]
	);

	useEffect(() => {
		getClients();
	}, [getClients]);

	useEffect(() => {
		const { id, name, email, cpf } = clientToEdit;

		id && setId(id);
		setName(name);
		setEmail(email);
		setCpf(cpf);
	}, [clientToEdit]);

	return (
		<div className="homeContainer">
			<header>
				<h2>{id ? "Editar" : "Cadastrar"} cliente</h2>

				<form>
					<input
						type="input"
						placeholder="Nome"
						maxLength={100}
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
					<input
						type="input"
						placeholder="Email"
						maxLength={100}
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<input
						type="input"
						placeholder="Cpf"
						maxLength={11}
						value={cpf}
						onChange={(event) => setCpf(event.target.value)}
					/>
					<button type="submit" onClick={toggleSaveClient}>
						Salvar
					</button>
				</form>
			</header>

			<main>
				<h2>Meus clientes</h2>
				<div className="ClientsListContainer">
					{clients.length ? (
						clients.map((client) => (
							<Client
								key={String(client.id)}
								data={client}
								toggleAddPhone={toggleAddPhone}
								toggleEdit={(client) => setClientToEdit(client)}
							/>
						))
					) : (
						<div className="noClientsYet">
							Você ainda não possui nenhum cliente cadastrado.
						</div>
					)}
				</div>
			</main>
		</div>
	);
};

export default Home;
