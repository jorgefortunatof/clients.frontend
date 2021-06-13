import React, { useCallback, useState } from "react";
import { FiPlus, FiMinus, FiEdit2 } from "react-icons/fi";

import "./styles.scss";

type ClientType = {
	id: number;
	name: string;
	email: string;
	cpf: string;
	phones?: PhoneType[];
};

type PhoneType = {
	number: string;

	phoneType: {
		type: string;
		whatsapp: boolean;
	};
};

type ClientProps = {
	data: ClientType;

	toggleEdit: (client: ClientType) => void;
	toggleAddPhone: (
		id: number,
		number: string,
		type: string,
		whatsapp: boolean
	) => void;
};

const Client: React.FC<ClientProps> = ({
	data,
	toggleEdit,
	toggleAddPhone,
}) => {
	const { id, email, name, cpf, phones } = data;
	const [showAddNumber, setShowAddNumber] = useState(false);

	const [type, setType] = useState("");
	const [number, setNumber] = useState("");
	const [whatsapp, setWhatsapp] = useState(false);

	const toggleSave = useCallback(
		(event: any) => {
			event.preventDefault();

			if (!number || !type) {
				return alert("Preencha todos os campos!");
			}

			toggleAddPhone(id, number, type, whatsapp);

			setNumber("");
			setType("");
			setWhatsapp(false);
			setShowAddNumber(false);
		},
		[id, number, type, whatsapp, toggleAddPhone]
	);

	return (
		<div className="clientContainer">
			<button
				type="button"
				onClick={() => toggleEdit({ id, email, name, cpf })}
			>
				<FiEdit2 />
			</button>

			<span>Nome: {name}</span>
			<span>Email: {email}</span>
			<span>Cpf: {cpf}</span>

			<div className="clientPhones">
				<span>Números:</span>
				{phones?.map((phone) => (
					<span key={`${phone.number}-${phone.phoneType.type}`}>
						{phone.phoneType.type}: {phone.number}, Whatsapp:
						{phone.phoneType.whatsapp ? " Sim" : " Não"}
					</span>
				))}
			</div>

			<footer>
				{showAddNumber && (
					<form>
						<input
							type="input"
							placeholder="Tipo"
							maxLength={40}
							value={type}
							onChange={(event) => setType(event.target.value)}
						/>
						<input
							type="input"
							placeholder="Número"
							maxLength={11}
							value={number}
							onChange={(event) => setNumber(event.target.value)}
						/>

						<label htmlFor="whatsapp">
							<input
								id="whatsapp"
								type="checkbox"
								checked={whatsapp}
								onChange={() => setWhatsapp(!whatsapp)}
							/>
							whatsapp
						</label>

						<button onClick={toggleSave}>Adicionar Número</button>
					</form>
				)}

				{showAddNumber ? (
					<button type="button" onClick={() => setShowAddNumber(false)}>
						<FiMinus />
					</button>
				) : (
					<button type="button" onClick={() => setShowAddNumber(true)}>
						<FiPlus />
					</button>
				)}
			</footer>
		</div>
	);
};

export default Client;
