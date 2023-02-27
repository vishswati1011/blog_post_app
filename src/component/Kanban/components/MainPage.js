/* eslint-disable */
import React, { Component } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

import { Link } from 'react-router-dom';
import './style.css';
import AddBucket from './AddBucket';
import EditBucket from './EditBucket';
import EditTask from './EditTask';
import AddTask from './AddTask';
import Settings from './Settings';
// import TabLists1 from '../../../Tabs/Tabs1';
import { Chip, Avatar, Tooltip } from '@material-ui/core';
import { Face as FaceIcon, Today as DateIcon } from '@material-ui/icons';
const API_URL='http://cx.consdeployer.com/'
const url ='http://cx.consdeployer.com/';

const project_id="6048bb11a5fc11143933b771";
const sub_id="6048bbb4a5fc11143933b7ce"
const token = localStorage.getItem('token');
class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ideaTitle: '',
			//data
			buckets_array: [],
			tasks: {},
			bucketName: '',
			showBucketModal: false,
			remountVar: false,
			ideaId: null,
			newBucketRank: -1,

			//Helper Variables
			hasBeenFetched: false,
			bucket: '',
			priority: '',

			//Modal Show props.
			showAddModal: false,
			editModal: {},
			showEditModal: false,
			showSettings: false,
			showEditBucketModal: false,

			//Modal Assignee autocomplete array
			currentCompanyUsers: [],

			//Dragging variables for buckets.
			draggedBucketIndex: -1,
			targetBucketIndex: -1,
			isBucketDragged: false,
			isBucketEntered: false,

			//Dragging variables for tasks
			draggedTask: null,
			targetTask: null,
			isTaskDragged: false,
			isTaskEntered: false,
			draggedTaskTargetBucket: null,
			targetBucketForTask: null,

			autoSave: true,
		};
		this.saveData = this.saveData.bind(this);
	}
	smoothScroll() {
		window.scrollTo({
			top: document.body.scrollHeight,
			left: document.body.scrollWidth,
			behavior: 'smooth',
		});
	}
	saveData = async () => {
		this.setState({ showSettings: false });
		await axios
			.post(
				API_URL + 'api/user/buckets/save',
				{
					buckets: Object.assign({}, this.state.buckets_array),
					ideaId: this.state.ideaId,
				},
				{
					headers: {
						'x-access-token': token,
					},
				}
			)
			.then(
				(response) => {
					// console.log(response.data);
				},
				(error) => {
					console.error(error);
					alert('Error. Can not Load Data.');
				}
			);
		await axios
			.post(
				API_URL + 'api/user/tasks/save',
				{ tasks: this.state.tasks, ideaId: this.state.ideaId },
				{
					headers: {
						'x-access-token': token,
					},
				}
			)
			.then(
				(response) => {
					// console.log(response.data);
				},
				(error) => {
					console.error(error);
					alert('Error. Can not Load Data.');
				}
			);
		this.setState({ showSettings: false });
	};
	fetchAllData = () => {
		// if (this.props.location) {
			const _id = "6048bbb4a5fc11143933b7ce";
			axios
				.get(API_URL + 'api/user/buckets/' + _id, {
					headers: {
						'x-access-token': token,
					},
				})
				.then(
					(response) => {
						this.setState({ newBucketRank: response.data.length + 1 });
						this.setState({ buckets_array: response.data });
					},
					(error) => {
						console.error(error);
					}
				);

			axios
				.get(API_URL + 'api/user/tasks/' + _id, {
					headers: {
						'x-access-token': token,
					},
				})
				.then((response) => {
					var tasks = response.data;

					for (var i in tasks) {
						if (tasks[i].start_date)
							tasks[i].start_date = new Date(tasks[i].start_date);
						if (tasks[i].due_date)
							tasks[i].due_date = new Date(tasks[i].due_date);
					}

					this.setState({ tasks: tasks, hasBeenFetched: true });
				});

			const fetchIdeasUrl =
			API_URL + `api/user/ideas/6048bb11a5fc11143933b771`;
			axios
				.get(fetchIdeasUrl, {
					headers: {
						'Access-Control-Allow-Headers': 'x-access-token',
						'x-access-token': token,
					},
				})
				.then(async (res) => {
					await this.setState({ ideas: res.data });

					let index = res.data.findIndex(
						(idea) => idea._id =="6048bbb4a5fc11143933b7ce"
					);
					this.setState({ ideaTitle: res.data[index].ideaTitle });
				})
				.catch((err) => {
					console.error(err);
				});

			axios
				.get(url + 'api/user/mycompanyusers', {
					headers: {
						'Access-Control-Allow-Headers': 'x-access-token',
						'x-access-token': token,
					},
				})
				.then(({ data: users }) => {
					this.setState({ currentCompanyUsers: users });
				})
				.catch((err) => console.error(err));
		// }
	};
	callEditBucket(bucket) {
		axios
			.put(
				`${url}api/user/buckets/edit`,
				{ bucket: bucket },
				{
					headers: {
						'x-access-token': token,
					},
				}
			)
			.then((res) => {
				this.setState({ showEditBucketModal: false });
				this.fetchAllData();
			})
			.catch((err) => {
				console.error(err);
			});
	}
	async componentDidMount() {
		// console.log("componetn did mount",this.props.location)
		// if (this.props.location) {
			this.setState({ ideaId: "6048bbb4a5fc11143933b7ce"});
		// }
		this.setState({ remountVar: false });
		this.setState({
			autoSave:
				window.localStorage.getItem('autoSave') === 'true' ? true : false,
		});
		this.fetchAllData();
	}

	orderTask = async (task, b_Id) => {
		var tasks = this.state.tasks;
		var bucketId = task.bucket._id ? task.bucket._id : task.bucket;
		if (b_Id) {
			bucketId = b_Id;
		}
		var rank = -1;
		//Find new rank for new task
		let tasks_ = Object.keys(tasks).filter((id) => {
			return tasks[id]['bucket']['_id'] === bucketId;
		});
		if (tasks_.length === 0) {
			rank = 1;
		} else {
			let ranks = tasks_.map((bucket) => tasks[bucket].rank);
			rank = Math.max.apply(0, ranks) + 1;
		}
		return rank;
	};

	// This function is used to add a new task
	addTask = async (task, fileData) => {
		task.rank = await this.orderTask(task);
		if (fileData !== null) {
			axios
				.post(`${url}api/user/tasks/files`, fileData, {
					headers: {
						'Allow-Access-Control': 'x-access-token',
						'x-access-token': token,
					},
				})
				.then(async (res) => {
					task.attachments = res.data.filenames;
					//Call Add task API
					axios
						.post(
							`${url}api/user/tasks/add`,
							{ task: task },
							{
								headers: {
									'x-access-token': token,
								},
							}
						)
						.then((res) => {
							this.setState({ showAddModal: false });
							this.fetchAllData();
						})
						.catch((err) => {
							console.error(err);
						});
				})
				.catch((err) => {
					console.error(err);
				});
		} else {
			axios
				.post(
					`${url}api/user/tasks/add`,
					{ task: task },
					{
						headers: {
							'x-access-token': token,
						},
					}
				)
				.then((res) => {
					this.setState({ showAddModal: false });
					this.fetchAllData();
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	editTask(task) {
		this.setState({ editModal: task });
		this.setState({
			name: task.name,
			description: task.description,
			bucket: task.bucket,
			assignees: task.assignees,
			start_date: task.start_date,
			due_date: task.due_date,
			progress: task.progress,
			label_color: task.label_color,
			priority: task.priority,
			showEditModal: true,
			attachments: task.attachments,
		});
	}

	saveEditTask = async (task, fileData) => {
		//task.rank = await this.orderTask(task, "edit")
		if (fileData !== null) {
			axios
				.post(`${url}api/user/tasks/files`, fileData, {
					headers: {
						'Allow-Access-Control': 'x-access-token',
						'x-access-token': token,
					},
				})
				.then(async (res) => {
					await res.data.filenames.forEach((file) => {
						task.attachments.push(file);
					});
					//Call Edit task API
					axios
						.put(
							`${url}api/user/tasks/edit`,
							{ task: task },
							{
								headers: {
									'x-access-token': token,
								},
							}
						)
						.then((res) => {
							this.fetchAllData();
							this.setState({ showEditModal: false });
						})
						.catch((err) => {
							console.error(err);
						});
				})
				.catch((err) => {
					console.error(err);
				});
		} else {
			axios
				.put(
					`${url}api/user/tasks/edit`,
					{ task: task },
					{
						headers: {
							'x-access-token': token,
						},
					}
				)
				.then((res) => {
					this.fetchAllData();
					this.setState({ showEditModal: false });
				})
				.catch((err) => {
					console.error(err);
				});
		}

		//var tasks = this.state.tasks;
		//tasks[task.id] = task;
		//this.setState({ tasks: tasks, showEditModal: false });

		// if (fileForm.get("attachments")) {
		//   await this.saveData()
		//   fileForm.append("id", task.id)
		//   const config = {
		//     headers: {
		//       'Content-Type': 'multipart/form-data'
		//     }
		//   }
		//   axios.post(url + 'files', fileForm, config).then((res) => {
		//     console.log(res)
		//     this.fetchAllData()
		//   }).catch(err => {
		//     console.log(err)
		//   })
		// } else {
		//   await this.saveData()
		//   this.fetchAllData()
		// }
	};
	deleteTask = (task) => {
		axios
			.delete(`${url}api/user/tasks/delete/`, {
				data: { task: task },
				headers: {
					'x-access-token': token,
				},
			})
			.then((res) => {
				if (res.data.message === 'Deleted') {
					this.fetchAllData();
				} else {
					console.error(res.data);
				}
				this.setState({ showEditModal: false });
			})
			.catch((err) => {
				console.error(err);
			});
	};
	//bucket
	deleteBucket = (bucket) => {
		axios
			.delete(`${url}api/user/buckets/delete/`, {
				data: { bucket: bucket },
				headers: {
					'x-access-token': token,
				},
			})
			.then((res) => {
				if (res.data.message === 'Deleted') {
					this.fetchAllData();
				} else {
					console.error(res.data);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};
	async onRoutechange( e) {
		e.preventDefault();
		const tokenvalue = localStorage.getItem('token');
		try {
			const response1 = await axios.get(
				`${API_URL}subproject/${project_id}`,
				(axios.defaults.headers.common['x-access-token'] = tokenvalue),
				{
					headers: {
						'content-type': 'application/x-www-form-urlencoded',
					},
				}
			);

			if (response1.status === 200) {
				let sub_id = response1.data[0]._id;
				let maptype = response1.data[0].mapType;
				if (maptype == 'Customer')
					this.props.history.push(`/cjm/${project_id}/${sub_id}`);
				else if (maptype == 'Business') {
					this.props.history.push(`/bmc/${project_id}/${sub_id}`);
				} else if (maptype == 'Persona') {
					this.props.history.push(`/persona/${project_id}/${sub_id}/0`);
				} else if (maptype == 'Empathy') {
					this.props.history.push(`/empathy/${project_id}/${sub_id}`);
				}
			}
		} catch (error) {
			console.error(error);

			this.props.history.push(`/maptype:${project_id}`);
		}
	}

	// This is the render function
	render() {
		if (this.state.ideaId === null) {
			return <div>No Idea specified</div>;
		}
		return (
			<div className='App' style={{ overflow: 'auto' }}>
				{/* ----------------------------------------------Container-------------------------------------------- */}
				<Container className='board' fluid>
					{/* ---------------------Task Lists------------------- */}
					<Row className='flex-row flex-nowrap bucket-container' fluid='true'>
						{/* ---------------------Buckets------------------- */}
						{this.state.buckets_array
							.sort((a, b) => {
								return parseInt(a.rank) - parseInt(b.rank);
							})
							.map((bucket, idx) => (
								<div
									key={idx}
									id={bucket._id}
									className='bucket'
									draggable={true}
									//All drag event handlers for buckets below
									onDragStart={() => {
										this.setState({ isBucketDragged: true });
										this.setState({
											draggedBucketIndex: this.state.buckets_array.indexOf(
												bucket
											),
										});
									}}
									onDragOver={() => {
										if (bucket !== this.state.targetBucketForTask) {
											this.setState({ targetBucketForTask: bucket });
										}
									}}
									onDragEnter={async () => {
										if (this.state.isBucketDragged) {
											if (
												this.state.draggedBucketIndex !==
												this.state.buckets_array.indexOf(bucket)
											) {
												this.setState({ isBucketEntered: true });
											}
											await this.setState({
												targetBucketIndex: this.state.buckets_array.indexOf(
													bucket
												),
											});
										} else if (this.state.isTaskDragged) {
											this.setState({ draggedTaskTargetBucket: bucket });
										}
									}}
									onDragEnd={async (e) => {
										if (this.state.isBucketDragged) {
											if (this.state.isBucketEntered) {
												const buckets = this.state.buckets_array;
												const draggedRank =
													buckets[this.state.draggedBucketIndex].rank;
												const targetRank =
													buckets[this.state.targetBucketIndex].rank;
												buckets[
													this.state.draggedBucketIndex
												].rank = targetRank;
												buckets[
													this.state.targetBucketIndex
												].rank = draggedRank;
												this.setState({ buckets_array: buckets });
												axios
													.put(
														`${url}api/user/buckets/bucketswap`,
														{
															bucket1: buckets[this.state.draggedBucketIndex],
															bucket2: buckets[this.state.targetBucketIndex],
														},
														{
															headers: {
																'x-access-token': token,
															},
														}
													)
													.then((res) => {
														this.fetchAllData();
														this.setState({
															draggedBucketIndex: -1,
															targetBucketIndex: -1,
															isBucketDragged: false,
														});
													})
													.catch((err) => {
														console.error(err);
													});
											}
										} else if (
											this.state.isTaskDragged &&
											this.state.isTaskEntered
										) {
											const tasks = this.state.tasks;

											if (
												this.state.draggedTask.bucket._id !==
												this.state.targetBucketForTask._id
											) {
												let rank = await this.orderTask(
													this.state.draggedTask,
													this.state.targetBucketForTask._id
												);
												tasks[
													this.state.draggedTask._id
												].bucket = this.state.targetBucketForTask;
												tasks[this.state.draggedTask._id].rank = rank;

												axios
													.put(
														`${url}api/user/tasks/edit`,
														{ task: tasks[this.state.draggedTask._id] },
														{
															headers: {
																'x-access-token': token,
															},
														}
													)
													.then((res) => {
														this.fetchAllData();
													})
													.catch((err) => {
														console.error(err);
													});
											} else {
												const tasks = this.state.tasks;
												const draggedRank = this.state.draggedTask.rank;

												tasks[
													this.state.draggedTask._id
												].rank = this.state.targetTask.rank;
												tasks[this.state.targetTask._id].rank = draggedRank;

												axios
													.put(
														`${url}api/user/tasks/taskswap`,
														{
															task1: tasks[this.state.draggedTask._id],
															task2: tasks[this.state.targetTask._id],
														},
														{
															headers: {
																'x-access-token': token,
															},
														}
													)
													.then((res) => {
														this.fetchAllData();
														this.setState({
															isTaskDragged: false,
															isTaskEntered: false,
															targetTask: null,
															draggedTask: null,
															targetBucketForTask: null,
														});
													})
													.catch((err) => {
														console.error(err);
													});
											}
											this.setState({ tasks: tasks });
										}
									}}>
									<div
										className='paper-list'
										id={idx + 'bc'}
										style={{ width: '350px' }}>
										<div
											className='bucket-title'
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}>
											<div className='m-0 flex-grow-1'>
												<h6
													id={bucket._id}
													style={{
														margin: '0',
														marginBottom: '10px',
														color: '#949494',
														fontWeight: 'bold',
														fontSize: '14px',
													}}>
													{bucket.name}
												</h6>
											</div>
											<div className='ml-3 d-flex bucket-buttons'>
												<i
													style={{ cursor: 'pointer' }}
													className='float-right mr-2 fas fa-trash bucket-edit' //Delete Bucket
													onClick={() => {
														if (
															window.confirm('Are you sure to delete lane?')
														) {
															this.deleteBucket(bucket);
														}
													}}></i>
												<i
													style={{ cursor: 'pointer' }}
													className='fas fa-pen bucket-edit'
													onClick={() =>
														this.setState({
															showEditBucketModal: true,
															bucket: bucket,
														})
													}></i>
											</div>
										</div>

										{/* ====== Displaying the task cards in bucket ============*/}
										{Object.values(this.state.tasks)
											.sort((a, b) => {
												return parseInt(a.rank) - parseInt(b.rank);
											})
											.map((task, idx) =>
												task.bucket._id === bucket._id ? (
													<div
														key={idx}
														style={{
															maxWidth: '100%',
															backgroundColor: '#fff',
															marginTop: '10px',
															marginBottom: '10px',
															padding: '20px',
															filter:
																'drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.05))',
															borderRadius: '10px',
															cursor: 'pointer',
														}}
														id={task._id}
														draggable={true}
														onDragStart={(e) => {
															e.stopPropagation();
															this.setState({
																draggedTask: task,
																isTaskDragged: true,
															});
														}}
														onDragEnter={(e) => {
															if (this.state.draggedTask !== task) {
																this.setState({
																	targetTask: task,
																	isTaskEntered: true,
																});
															}
															// Must be set to true even if task is same
															this.setState({ isTaskEntered: true });
														}}
														onDragEnd={(e) => {
															console.log('Task drag Ended');
														}}>
														<div
															onClick={() => this.editTask(task)}
															style={{
																display: 'flex',
																flexDirection: 'column',
																gap: '10px',
															}}>
															<div
																style={{
																	display: 'flex',
																	alignItems: 'center',
																	justifyContent: 'space-between',
																}}>
																<h6
																	style={{
																		margin: '0',
																		whiteSpace: 'break-spaces',
																		fontStyle: 'normal',
																		fontWeight: 'normal',
																	}}>
																	{task.name}
																</h6>
																<svg
																	style={{ color: task.label_color }}
																	width='1.5rem'
																	height='1.5rem'
																	// styleName={{ color: 'black' }}
																	viewBox='0 0 16 16'
																	fill='currentColor'
																	xmlns='http://www.w3.org/2000/svg'>
																	<path
																		fillRule='evenodd'
																		d='M3 3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12l-5-3-5 3V3z'
																	/>
																</svg>
															</div>

															{/*============ More Details of tasks================= */}
															<div>
																<div
																	style={{
																		display: 'flex',
																		flexWrap: 'wrap !important',
																		gap: '5px',
																	}}>
																	{task.assignees.map((assignee) => (
																		<>
																			<Tooltip
																				title={assignee.username}
																				aria-label={assignee.username}>
																				<Avatar>
																					<small>
																						{assignee.username &&
																							(function() {
																								const nameArray = assignee.username.split(
																									' '
																								);
																								return (
																									assignee.username[0].toUpperCase() +
																									nameArray[
																										nameArray.length - 1
																									][0].toUpperCase()
																								);
																							})()}
																					</small>
																				</Avatar>
																			</Tooltip>
																		</>
																	))}
																</div>
															</div>
															<div>
																<div
																	style={{
																		display: 'flex',
																		alignItems: 'center',
																		justifyContent: 'space-between',
																	}}>
																	{task.start_date && (
																		<small
																			style={{
																				display: 'flex',
																				gap: '0.5rem',
																				alignItems: 'center',
																			}}>
																			<p style={{ fontSize: '10px' }}>
																				Start Date
																			</p>
																			<svg
																				xmlns='http://www.w3.org/2000/svg'
																				style={{
																					width: '1rem',
																					height: '1rem',
																					color: '#3A40C8',
																				}}
																				fill='none'
																				viewBox='0 0 24 24'
																				stroke='currentColor'>
																				<path
																					strokeLinecap='round'
																					strokeLinejoin='round'
																					strokeWidth={2}
																					d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
																				/>
																			</svg>
																			<p
																				style={{
																					fontSize: '12px',
																					color: '#3A40C8',
																				}}>
																				{new Date(task.start_date)
																					.toDateString()
																					.substring(
																						3,
																						new Date(
																							task.start_date
																						).toDateString().length - 5
																					)}
																			</p>
																		</small>
																	)}
																	{task.due_date && (
																		<small
																			style={{
																				display: 'flex',
																				gap: '0.5rem',
																				alignItems: 'center',
																			}}>
																			<p style={{ fontSize: '10px' }}>
																				Due Date
																			</p>
																			<svg
																				xmlns='http://www.w3.org/2000/svg'
																				style={{
																					width: '1rem',
																					height: '1rem',
																					color: '#C4313A',
																				}}
																				fill='none'
																				viewBox='0 0 24 24'
																				stroke='currentColor'>
																				<path
																					strokeLinecap='round'
																					strokeLinejoin='round'
																					strokeWidth={2}
																					d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
																				/>
																			</svg>
																			<p
																				style={{
																					fontSize: '12px',
																					color: '#C4313A',
																				}}>
																				{new Date(task.due_date)
																					.toDateString()
																					.substring(
																						3,
																						new Date(
																							task.due_date
																						).toDateString().length - 5
																					)}
																			</p>
																		</small>
																	)}
																</div>
															</div>
														</div>
													</div>
												) : null
											)}

										<div
											style={{
												backgroundColor: '#fff',
												boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.05)',
												borderRadius: '30px',
												padding: '8px',
												textAlign: 'center',
												cursor: 'pointer',
												fontSize: '14px',
												color: '#949494',
											}}
											onClick={() =>
												this.setState({
													showAddModal: true,
													bucket: bucket,
												})
											}>
											+ Add task
										</div>
									</div>
								</div>
							))}
						{this.state.hasBeenFetched && (
							<Col id='i-add-bucket'>
								<div
									style={{
										backgroundColor: '#fff',
										boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.05)',
										borderRadius: '30px',
										padding: '8px',
										textAlign: 'center',
										cursor: 'pointer',
										fontSize: '14px',
										color: '#949494',
									}}
									onClick={() => this.setState({ showBucketModal: true })}>
									+ Add Lane
								</div>
							</Col>
						)}
					</Row>
				</Container>

				{/* ---------------------Pop Up Modal for Adding NEW Bucket------------------- */}
				<AddBucket
					visibility={this.state.showBucketModal}
					toggleVisibility={() => {
						this.setState({ showBucketModal: !this.state.showBucketModal });
					}}
					buckets={this.state.buckets_array}
					ideaId={this.state.ideaId}
					saveFunction={this.saveBucket}
					refetch={this.fetchAllData}
					token={token}
					rank={this.state.newBucketRank}
					hideModal={() => {
						this.setState({ showBucketModal: false });
					}}
				/>

				{/* ---------------------Pop Up Modal for EDITING Bucket------------------- */}
				<EditBucket
					visibility={this.state.showEditBucketModal}
					bucket={this.state.bucket}
					saveFunction={(bucket) => {
						this.callEditBucket(bucket);
					}}
					hideModal={() => {
						this.setState({ showEditBucketModal: false });
					}}
				/>

				{/* ---------------------Pop Up Modal for EDITING TASK details------------------- */}
				<EditTask
					currentCompanyUsers={this.state.currentCompanyUsers}
					visibility={this.state.showEditModal}
					buckets={this.state.buckets_array}
					taskData={this.state.editModal}
					saveFunction={this.saveEditTask}
					deleteFunction={this.deleteTask}
					hideModal={() => this.setState({ showEditModal: false })}
					refetch={this.fetchAllData}
				/>

				{/* ---------------------Pop Up Modal for ADDING NEW TASK details------------------- */}

				<AddTask
					currentCompanyUsers={this.state.currentCompanyUsers}
					visibility={this.state.showAddModal}
					bucket={this.state.bucket}
					buckets={this.state.buckets_array}
					ideaId={this.state.ideaId}
					// callingBucket={this.state.bucketCallingAddTask}
					saveFunction={this.addTask}
					hideModal={() => this.setState({ showAddModal: false })}
				/>

				{/* ---------------------Pop Up Modal for SETTINGS------------------- */}

				<Settings
					visibility={this.state.showSettings}
					autoSave={this.state.autoSave}
					toggleAutoSave={(checked) => this.setState({ autoSave: checked })}
					saveFunction={this.saveData}
					hideModal={() => this.setState({ showSettings: false })}
				/>
				<div className='footer d-flex' style={{ height: '50px' }}>
					<div style={{ width: '80%' }}>
						{/* <TabLists1
							// params={this.props.location.params}
							history={this.props.history}
							data={this.state.tabsdata}
							deleteTab={this.deleteTab}
							tabShift={this.tabShift}
							setTab={this.setTab}
							pages='ideation'
							type='kanban'
							ideaTitle={this.state.ideaTitle}
						/> */}
					</div>

					<div
						className='idea-button'
						style={{
							width: '10%',
							height: '72px',

							overflowY: 'hidden',
						}}>
						<div className='new-idea-container'>
							<div>
								{' '}
								<button
									className='ideate-button'
									variant='contained'
									style={{
										display: 'flex',
										alignItems: 'center',
										padding: '6px',
										borderRadius: '30px',
										border: 'none',
										gap: '0.25rem',
										color: '#949494',
										backgroundColor: '#ffffff',
										border: '1px solid #FAFAFA',
									}}
									onClick={(e) =>
										this.onRoutechange(project_id, e)
									}>
									<svg
										width='18'
										height='14'
										viewBox='0 0 18 14'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M16 1.75H9L7.25 0H2C1.0375 0 0.25875 0.7875 0.25875 1.75L0.25 12.25C0.25 13.2125 1.0375 14 2 14H16C16.9625 14 17.75 13.2125 17.75 12.25V3.5C17.75 2.5375 16.9625 1.75 16 1.75ZM16 12.25H2V1.75H6.52375L8.27375 3.5H16V12.25ZM14.25 7H3.75V5.25H14.25V7ZM10.75 10.5H3.75V8.75H10.75V10.5Z'
											fill='#949494'
										/>
									</svg>
									<p>View Projects</p>
								</button>
							</div>
						</div>
					</div>
					<div
						className='idea-button'
						style={{
							width: '9%',
							height: '72px',

							overflowY: 'hidden',
						}}>
						<div className='new-idea-container'>
							<div>
								<Link to={`/ideation/${project_id}`}>
									{' '}
									<button
										style={{
											display: 'flex',
											alignItems: 'center',
											padding: '6px',
											borderRadius: '30px',
											border: 'none',
											gap: '0.25rem',
											color: '#949494',
											backgroundColor: '#ffffff',
											border: '1px solid #FAFAFA',
										}}>
										<svg
											width='21'
											height='14'
											viewBox='0 0 21 14'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'>
											<path
												d='M10.5 1.86667C14.1177 1.86667 17.3441 3.85467 18.9191 7C17.3441 10.1453 14.1177 12.1333 10.5 12.1333C6.88227 12.1333 3.65591 10.1453 2.08091 7C3.65591 3.85467 6.88227 1.86667 10.5 1.86667ZM10.5 0C5.72727 0 1.65136 2.90267 0 7C1.65136 11.0973 5.72727 14 10.5 14C15.2727 14 19.3486 11.0973 21 7C19.3486 2.90267 15.2727 0 10.5 0ZM10.5 4.66667C11.8173 4.66667 12.8864 5.712 12.8864 7C12.8864 8.288 11.8173 9.33333 10.5 9.33333C9.18273 9.33333 8.11364 8.288 8.11364 7C8.11364 5.712 9.18273 4.66667 10.5 4.66667ZM10.5 2.8C8.13273 2.8 6.20455 4.68533 6.20455 7C6.20455 9.31467 8.13273 11.2 10.5 11.2C12.8673 11.2 14.7955 9.31467 14.7955 7C14.7955 4.68533 12.8673 2.8 10.5 2.8Z'
												fill='#949494'
											/>
										</svg>
										<p>View Ideas</p>
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MainPage;
