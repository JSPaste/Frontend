export default function () {
	return (
		<div className='flex flex-col gap-4'>
			<p>Editor theme:</p>
			<div className='flex justify-between align-middle items-center'>
				<div className='join join-horizontal'>
					<input
						type='radio'
						name='theme-buttons'
						className='btn theme-controller join-horizontal'
						aria-label='Default'
						value='default'
					/>
					<input
						type='radio'
						name='theme-buttons'
						className='btn theme-controller join-horizontal'
						aria-label='Light'
						value='light'
					/>
					<input
						type='radio'
						name='theme-buttons'
						className='btn theme-controller join-horizontal'
						aria-label='Dark'
						value='dark'
					/>
				</div>
			</div>
		</div>
	);
}
