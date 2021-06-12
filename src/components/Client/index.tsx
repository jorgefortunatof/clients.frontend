import React from "react";
import { FiPlus } from "react-icons/fi";

import "./styles.scss";

type PhoneType = {
	number: string;

	phoneType: {
		type: string;
		whatsapp: boolean;
	};
};

type ClientProps = {
	id?: number;
	name: string;
	email: string;
	cpf: string;

	phones?: PhoneType[];
};

const Client: React.FC<ClientProps> = ({ email, name, phones, cpf }) => {
	return (
		<div className="clientContainer">
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
				<button>
					<FiPlus />
				</button>
			</footer>
		</div>
	);
};

export default Client;
