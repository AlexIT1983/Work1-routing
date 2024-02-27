// Задание 1.  Переработать список дел (6. Маршрутизация)
// React Router + JSON Server

import { Route, Routes } from "react-router-dom";
import { MainPage, TodoPage, ErrorPage } from "./pages";
import styles from "./App.module.css";

export const App = () => (
	<div className={styles.app}>
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/task" element={<TodoPage />} />
			<Route path="/task/:id" element={<TodoPage />} />
			<Route path="*" element={<ErrorPage />} />
			<Route path="/404" element={<ErrorPage />} />
		</Routes>
	</div>
);
