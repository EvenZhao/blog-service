class Body extends React.Component {
    constructor(props) {
		super(props);
	}
	render () {
		return (
			<div> hello world</div>
		)
	}
}

ReactDOM.render(< Body />,
	document.getElementById('app')
);
