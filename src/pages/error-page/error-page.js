// Компонент для обработки неправильно адреса
import { ControlPanel, Button } from "../../components";
import { Link } from "react-router-dom";

export const ErrorPage = () => (
	<>
		<ControlPanel>
			<Button>
				<Link to="/">
					<b>&larr;</b>
				</Link>
			</Button>
		</ControlPanel>
		<div>Такой страница не существует. Ошибка 404</div>
	</>
);
