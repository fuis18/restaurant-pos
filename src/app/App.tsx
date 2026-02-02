import Header from "@/components/Header";
import "./App.css";

import { Outlet } from "react-router-dom";

function App() {
	return (
		<>
			<Header />
			<div className="p-4">
				<Outlet></Outlet>
			</div>
		</>
	);
}

export default App;
