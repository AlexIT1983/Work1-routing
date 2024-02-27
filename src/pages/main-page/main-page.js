// Наш компонент главное страницы

import { useEffect, useState } from "react";
import { readTodos, updateTodo } from "../../api";
import { setTodoInTodos } from "../../utils";
import { Button, ControlPanel } from "../../components";
import { Search, Sorting } from "./components";
import { Link } from "react-router-dom";
import styles from "./main-page.module.css";

export const MainPage = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState("");
	const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);

	const onTodoCompletedChange = (id, newCompleted) => {
		updateTodo({ id, completed: newCompleted }).then(() => {
			setTodos(setTodoInTodos(todos, { id, completed: newCompleted }));
		});
	};

	useEffect(() => {
		setIsLoading(true);

		readTodos(searchPhrase, isAlphabetSorting)
			.then((loadedTodos) => setTodos(loadedTodos))
			.finally(() => setIsLoading(false));
	}, [searchPhrase, isAlphabetSorting]);

	return (
		<>
			<ControlPanel>
				<Search onSearch={setSearchPhrase} />
				<Sorting onSorting={setIsAlphabetSorting} />
				<Button>
					<Link to="/task">✚</Link>
				</Button>
			</ControlPanel>

			<div>
				{isLoading ? (
					<div className={styles.loadingLabel}></div>
				) : (
					todos.map(({ id, title, completed }) => (
						<div className={styles.todo} key={id}>
							<input
								className={styles.checkbox2}
								type="checkbox"
								checked={completed}
								onChange={({ target }) =>
									onTodoCompletedChange(id, target.checked)
								}
							/>
							№: {id}.
							<Link
								to={`/task/${id}`}
								className={styles.todoTitle}
							>
								{title}
							</Link>
						</div>
					))
				)}
			</div>
		</>
	);
};
