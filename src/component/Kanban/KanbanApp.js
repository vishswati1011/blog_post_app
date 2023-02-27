/* eslint-disable */
import React from 'react';
import { useLocation } from 'react-router-dom';
import MainPage from './components/MainPage';

function KanbanApp(props) {
	//document.title = "Kanban | Edunomics";
	const location = useLocation();
	document.title = 'Board - CX Deployer';
	return (
		<div>
			<MainPage location={props.match} history={props.history} />
		</div>
	);
}

export default KanbanApp;
