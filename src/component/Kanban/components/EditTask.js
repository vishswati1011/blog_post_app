/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Modal, Dropdown, Row, Col, DropdownButton } from 'react-bootstrap';
import {
	Button as MUIButton,
	Checkbox,
	FormControlLabel,
	TextField,
	IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AddCircle, Cancel } from '@material-ui/icons';
import { DatePicker } from "react-rainbow-components";
import './style.css';
import image from '../images/img.png';
import docIcon from '../images/doc.png';
import pptIcon from '../images/ppt.png';
import exlIcon from '../images/excel.jpg';
import axios from 'axios';
const url ='http://cx.consdeployer.com/';
const token = localStorage.getItem('token');

function EditTask(props) {
	const [task, setTask] = useState({});
	const [uploadFiles, setUploadFiles] = useState(null);

	const [checklistName, setChecklistName] = useState('');
	const [checklist, setChecklist] = useState([]);

	const extension = {
		png: image,
		jpg: image,
		docx: docIcon,
		doc: docIcon,
		ppt: pptIcon,
		pptx: pptIcon,
		pps: pptIcon,
		pdf: docIcon,
		xlsx: exlIcon,
	};

	useEffect(() => {
		setTask(props.taskData);
		setChecklist(props.taskData.checklist);
	}, [props]);

	const handleFileUploadChange = (event) => {
		setUploadFiles(event.target.files);
	};
	const submitEditedTask = () => {
		let fileData = new FormData();
		if (uploadFiles !== null) {
			for (var i = 0; i < uploadFiles.length; i++) {
				fileData.append('files', uploadFiles[i]);
			}
		} else {
			fileData = null;
		}
		setUploadFiles(null);

		var task_ = { ...task };
		task_.checklist = checklist;
		props.saveFunction(task_, fileData);
	};
	const deleteAttachment = (event, attachment) => {
		//const attachment = event.target.id;

		axios
			.delete(`${url}api/user/tasks/deleteAttachment/`, {
				data: { taskId: task._id, fileName: attachment },
				headers: {
					'x-access-token': token,
				},
			})
			.then((res) => {
				props.hideModal();
				props.refetch();
			})
			.catch((err) => {
				console.error(err);
			});
	};
	const handleChecklistAdd = (event) => {
		if (event.key === 'Enter') {
			var checklist_ = checklist;
			checklist_ = [
				...checklist,
				{ name: checklistName, isChecked: false, isDisabled: true },
			];

			setChecklist(checklist_);
			setChecklistName('');
		}
	};
	const handleChecklistEdit = (event, idx) => {
		if (event.key === 'Enter') {
			var checklist_ = [...checklist];

			checklist_[idx].name = event.target.value;
			checklist_[idx].isDisabled = true;

			setChecklist(checklist_);
			setChecklistName('');
		}
	};
	const handleEnableEditChecklist = (idx) => {
		var checklist_ = [...checklist];
		checklist_[idx].isDisabled = false;
		setChecklist(checklist_);
	};

	const handleChecklistItemDelete = (idx) => {
		var checklist_ = [...checklist];
		checklist_.splice(idx, 1);
		setChecklist(checklist_);
	};

	if (task === {}) {
		return <div>Loading</div>;
	}

	return (
		<Modal
			size='lg'
			backdropClassName='new-mod_backdrop'
			centered
			show={props.visibility}
			onHide={() => props.hideModal()}
			scrollable>
			<div
				style={{
					padding: '38px 38px 10px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}>
				<h3 style={{ fontWeight: 'bold', fontSize: '20px', color: '#949494' }}>
					Edit Task
				</h3>
				<svg
					onClick={props.hideModal}
					xmlns='http://www.w3.org/2000/svg'
					style={{
						height: '1.5rem',
						width: '1.5rem',
						color: '#424242',
						cursor: 'pointer',
					}}
					viewBox='0 0 20 20'
					fill='currentColor'>
					<path
						fillRule='evenodd'
						d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
						clipRule='evenodd'
					/>
				</svg>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '10px',
					maxHeight: '600px',
					overflowY: 'scroll',
				}}>
				<form
					style={{
						margin: '0',
						padding: '0 38px',
						display: 'flex',
						flexDirection: 'column',
						maxWidth: 'none',
					}}>
					<section style={{ display: 'flex', flexDirection: 'column' }}>
						<label style={{ fontSize: '14px', color: '#949494', margin: '0' }}>
							Name*
						</label>
						<input
							style={{
								padding: '10px',
								borderRadius: '8px',
								boxShadow: 'inset 0px 1px 2px 1px rgba(38, 39, 40, 0.2)',
								border: 'none',
							}}
							onChange={(e) => {
								setTask({
									...task,
									name: e.target.value,
								});
							}}
							value={task.name || ''}
							placeholder='Enter Name'
							maxLength='80'
						/>
					</section>
					<div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
						<small style={{ color: '#949494', fontSize: '10px' }}>
							{task.name ? task.name.length : 0}/80
						</small>
					</div>
				</form>

				<form
					style={{
						margin: '0',
						padding: '0 38px',
						display: 'flex',
						flexDirection: 'column',
						maxWidth: 'none',
					}}>
					<Autocomplete
						id='edit-assignee'
						multiple
						options={props.currentCompanyUsers}
						getOptionLabel={(option) => option.username}
						onChange={(e, newValue) =>
							setTask({ ...task, assignees: newValue })
						}
						value={task.assignees || []}
						renderInput={(params) => (
							<TextField
								{...params}
								variant='outlined'
								label='Add Assignee *'
							/>
						)}
					/>
				</form>
				<section
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						padding: '0 38px',
						gap: '10px',
					}}>
					<div>
						<form style={{ maxWidth: 'none' }}>
							<label
								style={{ fontSize: '14px', color: '#949494', margin: '0' }}>
								Lane
							</label>
							<DropdownButton
								title={task.bucket !== undefined ? task.bucket.name : ''}
								variant='secondary'
								onSelect={(eventKey) => {
									const newBucket = props.buckets.filter(
										(bucket) => bucket._id === eventKey
									);
									setTask({ ...task, bucket: newBucket[0] });
								}}>
								{props.buckets
									? props.buckets.map((bucket, idx) => (
											<Dropdown.Item eventKey={bucket._id} key={idx}>
												{bucket.name}
											</Dropdown.Item>
									  ))
									: null}
							</DropdownButton>
						</form>
					</div>

					<div>
						<form style={{ maxWidth: 'none' }}>
							<label
								style={{ fontSize: '14px', color: '#949494', margin: '0' }}>
								Progress
							</label>
							<DropdownButton
								title={
									(task.progress === '' ? 'Select progress' : task.progress) ||
									''
								}
								variant='secondary'
								onSelect={(eventKey) => {
									setTask({ ...task, progress: eventKey });
								}}>
								<Dropdown.Item eventKey='Not Started'>
									Not Started
								</Dropdown.Item>
								<Dropdown.Item eventKey='In Progress'>
									In Progress
								</Dropdown.Item>
								<Dropdown.Item eventKey='Completed'>Completed</Dropdown.Item>
							</DropdownButton>
						</form>
					</div>

					<div>
						<form>
							<label
								style={{ fontSize: '14px', color: '#949494', margin: '0' }}>
								Label Colour
							</label>
							<DropdownButton
								title={
									(task.label_color === '#3797a4'
										? 'Default'
										: task.label_color) || ''
								}
								variant='secondary'
								onSelect={(eventKey) => {
									setTask({ ...task, label_color: eventKey });
								}}>
								<Dropdown.Item eventKey='Tomato'>Tomato</Dropdown.Item>
								<Dropdown.Item eventKey='MediumSeaGreen'>
									MediumSeaGreen
								</Dropdown.Item>
								<Dropdown.Item eventKey='Orange'>Orange</Dropdown.Item>
								<Dropdown.Item eventKey='DodgerBlue'>DodgerBlue</Dropdown.Item>
							</DropdownButton>
						</form>
					</div>

					<div>
						<form style={{ maxWidth: 'none' }}>
							<label
								style={{ fontSize: '14px', color: '#949494', margin: '0' }}>
								Priority
							</label>
							<DropdownButton
								variant='secondary'
								title={
									(task.priority === ''
										? 'Select task Priority'
										: task.priority) || ''
								}
								onSelect={(eventKey) => {
									setTask({
										...task,
										priority: eventKey,
									});
								}}>
								<Dropdown.Item eventKey='Low'>Low</Dropdown.Item>
								<Dropdown.Item eventKey='Medium'>Medium</Dropdown.Item>
								<Dropdown.Item eventKey='High'>High</Dropdown.Item>
							</DropdownButton>
						</form>
					</div>
				</section>
				<div
					style={{
						padding: '0 38px',
						display: 'flex',
						justifyContent: 'space-between',
					}}>
					<div
						style={{
							display: 'flex',
							gap: '5px',
							flexDirection: 'column',
						}}>
						<label
							style={{
								fontSize: '14px',
								color: '#949494',
								margin: '0',
								width: 'auto',
							}}>
							Start Date
						</label>
						<div>
							<DatePicker
								minDate={new Date()}
								dateFormat='dd/MM/yyyy'
								style={{
									padding: '10px',
									borderRadius: '8px',
									boxShadow: 'inset 0px 1px 2px 1px rgba(38, 39, 40, 0.2)',
									border: 'none',
								}}
								selected={task.start_date}
								onChange={(date) => {
									setTask({ ...task, start_date: date });
								}}
							/>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							gap: '5px',
							flexDirection: 'column',
						}}>
						<label
							style={{
								fontSize: '14px',
								color: '#949494',
								margin: '0',
								width: 'auto',
							}}>
							Due Date
						</label>

						<div>
							<DatePicker
								minDate={new Date()}
								dateFormat='dd/MM/yyyy'
								selected={task.due_date}
								onChange={(date) => {
									setTask({ ...task, due_date: date });
								}}
								style={{
									padding: '10px',
									borderRadius: '8px',
									boxShadow: 'inset 0px 1px 2px 1px rgba(38, 39, 40, 0.2)',
									border: 'none',
								}}
							/>
						</div>
					</div>
				</div>

				<form
					style={{
						margin: '0',
						padding: '0 38px',
						display: 'flex',
						flexDirection: 'column',
						maxWidth: 'none',
					}}>
					<label style={{ fontSize: '14px', color: '#949494', margin: '0' }}>
						Description*
					</label>

					<textarea
						rows='2'
						style={{
							padding: '10px',
							borderRadius: '8px',
							boxShadow: 'inset 0px 1px 2px 1px rgba(38, 39, 40, 0.2)',
							border: 'none',
						}}
						onChange={(e) => {
							setTask({ ...task, description: e.target.value });
						}}
						value={task.description}
						placeholder='Enter Description'
					/>
				</form>

				<form
					style={{
						margin: '0',
						padding: '0 38px',
						display: 'flex',
						flexDirection: 'column',
						maxWidth: 'none',
					}}>
					<label style={{ fontSize: '14px', color: '#949494', margin: '0' }}>
						Attachments
					</label>
				</form>
				<div id='attachments-container'>
					<div style={{ padding: '0 38px' }}>
						{task.attachments !== undefined &&
							task.attachments.length > 0 &&
							task.attachments.map((attachment, idx) => (
								<div key={idx}>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '0.25rem',
										}}>
										{['png', 'jpg', 'jpeg'].indexOf(
											attachment
												.split('.')
												.pop()
												.toLowerCase()
										) < 0 ? (
											<a
												className='attachment-link'
												href={url + 'user/' + attachment}
												target='_blank'
												rel='noopener noreferrer'>
												<small>{attachment?.slice(65)}</small>
											</a>
										) : (
											<a
												className='attachment-link'
												href={url + 'user/' + attachment}
												target='_blank'
												rel='noopener noreferrer'>
												<small>{attachment?.slice(65)}</small>
											</a>
										)}

										<button
											id={attachment}
											type='button'
											style={{ border: 'none', backgroundColor: '#fff' }}
											onClick={(e) => deleteAttachment(e, attachment)}>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												style={{
													height: '1rem',
													width: '1rem',
													color: 'red',
												}}
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
												/>
											</svg>
										</button>
									</div>
								</div>
							))}
					</div>
				</div>
				<div>
					<form
						style={{
							margin: '0',
							padding: '0 38px',
							display: 'flex',
							flexDirection: 'column',
							maxWidth: 'none',
						}}>
						<label style={{ fontSize: '14px', color: '#949494', margin: '0' }}>
							Add more files
						</label>
						<div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
							<input
								type='file'
								id='files'
								multiple
								style={{
									padding: '10px',
									borderRadius: '8px',
									boxShadow: 'inset 0px 1px 2px 1px rgba(38, 39, 40, 0.2)',
									border: 'none',
								}}
								onChange={handleFileUploadChange}
							/>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								style={{
									height: '1rem',
									width: '1rem',
									color: 'red',
								}}
								onClick={() => {
									setUploadFiles(null);
									document.getElementById('files').value = null;
								}}
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						</div>
					</form>
				</div>

				<form
					style={{
						margin: '0',
						padding: '0 38px',
						display: 'flex',
						flexDirection: 'column',
						maxWidth: 'none',
					}}>
					<label style={{ fontSize: '14px', color: '#949494', margin: '0' }}>
						Checklist
					</label>
				</form>
				{checklist
					? checklist.map((item, idx) => (
							<div
								key={idx}
								style={{
									padding: '0 30px',
									display: 'flex',
									gap: '10px',
									alignItems: 'center',
								}}>
								<div>
									<div className='d-flex h-100 align-items-center'>
										<Cancel
											style={{ color: 'red', cursor: 'pointer' }}
											onClick={() => {
												handleChecklistItemDelete(idx);
											}}
										/>
									</div>
								</div>
								{item.isDisabled ? (
									<Col
										className='pl-2'
										style={{ textAlign: 'left', wordBreak: 'break-all' }}>
										<FormControlLabel
											control={
												<Checkbox
													checked={item.isChecked}
													name='add'
													onChange={() => {
														var checklist_ = [...checklist];
														checklist_[idx].isChecked = !checklist_[idx]
															.isChecked;
														setChecklist(checklist_);
													}}
												/>
											}
											label={item.name}
											style={
												checklist[idx].isChecked
													? { textDecoration: 'line-through' }
													: {}
											}
										/>
									</Col>
								) : (
									<div>
										<TextField
											placeholder='Add an item'
											style={{ width: '90%' }}
											onKeyDown={(e) => handleChecklistEdit(e, idx)}
											defaultValue={item.name}
											onChange={(event) => {
												checklist[idx].name = event.target.value;
												setChecklist(checklist);
											}}
											inputProps={{ maxLength: 60 }}
										/>
									</div>
								)}
								{item.isDisabled ? (
									<div>
										<IconButton
											style={{ height: '30px', width: '30px' }}
											onClick={() => handleEnableEditChecklist(idx)}>
											<EditIcon />
										</IconButton>
									</div>
								) : (
									''
								)}
							</div>
					  ))
					: ''}
				<div
					style={{
						padding: '0 30px',
						display: 'flex',
						gap: '10px',
						alignItems: 'center',
					}}>
					<div>
						<AddCircle style={{ color: '#888DFF' }} />
					</div>
					<div>
						<TextField
							placeholder='Add an item'
							style={{ width: '90%' }}
							onKeyDown={handleChecklistAdd}
							value={checklistName}
							onChange={(event) => {
								setChecklistName(event.target.value);
							}}
							inputProps={{ maxLength: 60 }}
						/>
					</div>
				</div>
				{/* <small style={{ textAlign: 'center', fontWeight: 'bold' }}>
					Comments are disabled at the moment.
				</small> */}
				{/* <Container
					className='px-2 pt-4 mt-2'
					style={{ backgroundColor: '#e8e8e8' }}>
					<Row className='ml-3'>
						Comments :
						<br />
						<Col className='pl-2'>
							<Comments props={props.taskData} />
						</Col>
					</Row>
				</Container> */}
			</div>
			<div
				style={{
					display: 'flex',
					padding: '20px 38px 38px 38px',
					flexDirection: 'row-reverse',
					alignItems: 'center',
					gap: '1rem',
				}}>
				<button
					style={{
						border: 'none',
						color: '#fff',
						backgroundColor: `
            ${task.name === '' ? '#949494' : '#888dff'}
          `,
						padding: '8px 16px',
						borderRadius: '8px',
					}}
					onClick={() => submitEditedTask()}
					disabled={task.name === '' ? true : false}>
					Save Edits
				</button>
				<button
					style={{
						border: 'none',
						color: '#fff',
						backgroundColor: 'red',
						padding: '8px 16px',
						borderRadius: '8px',
					}}
					onClick={() => {
						props.deleteFunction(task);
					}}>
					Delete Task
				</button>
			</div>
		</Modal>
	);
}

export default EditTask;
