import React, { Component } from 'react';

export class PresentationForm extends Component {
	constructor(props) {
		super(props);
		this.inputRef = React.createRef();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.nativeEvent.stopImmediatePropagation();
		event.preventDefault();

		if(this.fileInput.files.length && this.fileInput.files.length > 0) {
			var data = new FormData();

			for(var index in this.fileInput.files) {
				if(index < this.fileInput.files.length)
					data.append('files', this.fileInput.files[index]);
			}

			const session = this.props.session;

		    fetch("http://104.131.9.190:3000/r/" + session + "/presentation", {
				method: 'POST',
				body: data,
		    }).then((response) => {
		 		console.log(response);
		    });
		} else {
			console.log("Error getting files");
		}
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<h2>Upload Presentation</h2>
				<br/>
				<label>
					<input type="file"
						ref={input => {
							this.fileInput = input;
						}}
						directory="true"
						webkitdirectory="true"
					/>
				</label>
				<br/><br/>
				<button type="submit">Submit</button>
			</form>
		);
	}
}