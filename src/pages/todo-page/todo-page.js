// наш компонент страниц todo
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, ControlPanel } from "../../components";
import styles from "./todo-page.module.css";
import { deleteTodo, createTodo, updateTodo, readTodo } from "../../api";
import { useEffect, useState } from "react";

export const TodoPage = () => {
	const [title, setTitle] = useState("");
	const { id } = useParams();
	const navigate = useNavigate();

	const onTitleChange = ({ target }) => setTitle(target.value); // устанавливаем title введеный пользователем

	const onRemove = () => deleteTodo(id).then(() => navigate("/")); // удаление задачи

	// функция сохранения
	const onSave = () => {
		if (id === undefined) {
			createTodo({ title, completed: false }).then(() => navigate("/"));
		} else {
			updateTodo({ id, title }).then(() => navigate("/"));
		}
	};

	useEffect(() => {
		readTodo(id).then((loadedTodo) => {
			setTitle(loadedTodo.title);
		});
	}, [id, navigate]);

	return (
		<>
			<ControlPanel>
				<Button>
					<Link to="/">
						<b>⬅</b>
					</Link>
				</Button>
				<Button onClick={onRemove}>❌</Button>
				<Button onClick={onSave}>💾</Button>
			</ControlPanel>

			<div>
				<textarea
					className={styles.titlePanel}
					value={title}
					onChange={onTitleChange}
				/>
			</div>
		</>
	);
};
