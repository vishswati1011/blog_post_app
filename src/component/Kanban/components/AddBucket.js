/* eslint-disable */
import React, { useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
const url ='http://cx.consdeployer.com/';
const axios = require('axios');

function AddBucket(props) {
	const [bucketName, setBucketName] = React.useState('');
	const [bucketNameLength, setBucketNameLength] = React.useState(0);
	useEffect(() => {
		setBucketName('');
	}, [props.visibility]);

	const handleSaveBucket = () => {
		const newBucket = {
			name: bucketName,
			rank: props.rank,
			ideaId: props.ideaId,
		};
		axios
			.post(
				`${url}api/user/buckets/add/${props.ideaId}`,
				{ bucket: newBucket },
				{
					headers: {
						'x-access-token': props.token,
					},
				}
			)
			.then((res) => {
				
				props.toggleVisibility();
				props.refetch();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div>
			<Modal
				size='md'
				centered
				show={props.visibility}
				onHide={() => props.hideModal()}>
				<div
					style={{
						paddingLeft: '38px',
						paddingTop: '38px',
						paddingRight: '38px',
						paddingBottom: '10px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}>
					<h3
						style={{
							fontWeight: 'bold',
							fontSize: '20px',
							color: '#949494',
							margin: '0',
						}}>
						Add New Lane
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
				<div>
					<form
						style={{
							display: 'flex',
							flexDirection: 'column',
							paddingLeft: '38px',
							paddingRight: '38px',
							gap: '0.5rem',
						}}>
						<section>
							<label style={{ fontSize: '14px', color: '#949494' }}>Name</label>
							<input
								style={{
									border: 'none',
									boxShadow: 'inset 0px 1px 2px 1px rgba(38, 39, 40, 0.2)',
									borderRadius: '8px',
									padding: '8px',
								}}
								maxLength={30}
								type='text'
								onChange={(e) => {
									setBucketName(e.target.value);
									setBucketNameLength(e.target.value.length);
								}}
								onKeyDown={(event) => {
									if (event.key === 'Enter') {
										event.preventDefault();
										handleSaveBucket();
									}
								}}
								value={bucketName}
							/>
						</section>
						<div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
							<small
								style={{
									fontWeight: '300',
									color: '#949494',
									fontSize: '12px',
								}}>
								{bucketNameLength}/30
							</small>
						</div>
					</form>
					<Alert
						variant='danger'
						className='text-center'
						style={{ padding: '5px 10px 5px 10px' }}
						show={props.buckets.indexOf(bucketName) !== -1 ? true : false}>
						Lane Already Exists
					</Alert>
				</div>
				<div
					style={{
						paddingLeft: '38px',
						paddingTop: '10px',
						paddingRight: '38px',
						paddingBottom: '38px',
						display: 'flex',
						flexDirection: 'row-reverse',
					}}>
					<button
						block
						onClick={() => {
							handleSaveBucket();
						}}
						disabled={
							bucketName === '' || props.buckets.indexOf(bucketName) !== -1
								? true
								: false
						}
						style={{
							cursor:
								bucketName === '' || props.buckets.indexOf(bucketName) !== -1
									? 'not-allowed'
									: 'pointer',
							border: 'none',
							padding: '8px 16px',
							background:
								bucketName === '' || props.buckets.indexOf(bucketName) !== -1
									? '#949494'
									: '#888DFF',
							borderRadius: '4px',
							color: '#fff',
						}}>
						Save Lane
					</button>
				</div>
			</Modal>
		</div>
	);
}

export default AddBucket;
