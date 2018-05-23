class PlayInRoomForm extends Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value.toUpperCase()});
	}

	handleSubmit(event) {
		event.nativeEvent.stopImmediatePropagation();
		event.preventDefault();

		console.log(this.state.value);
	}

	render() {
		return (
			<form style={{marginLeft:'75px'}} onSubmit={this.handleSubmit}>	
				<label>
					Room Code:
					<input type="text" value={this.state.value} onChange={this.handleChange} style={{marginLeft: '15px'}}/>
				</label>
				<br/><br/>
				<input type="submit" value="Play in Room" />
			</form>
		);
	}
}