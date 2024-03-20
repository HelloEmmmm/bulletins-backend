const General = () => {
	return (
		<div>
			<button
				onClick={() => setShowModal(!showModal)}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				获取后台配置信息
			</button>
			<button
				onClick={() => setShowModal(!showModal)}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				群发
			</button>
			<button
				onClick={() => setShowModal(!showModal)}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				群发
			</button>
			<button
				onClick={() => setShowModal(!showModal)}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				群发
			</button>
		</div>
	);
};

export default General;
