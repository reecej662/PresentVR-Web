import React, { Component } from 'react';

export class TranscriptForm extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.nativeEvent.stopImmediatePropagation();
		event.preventDefault();

		console.log(this.fileInput.files.length);

		if(this.fileInput.files.length && this.fileInput.files.length > 0) {
			var data = new FormData();
			data.set('files', this.fileInput.files);

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
				<h2>Upload Transcript</h2>
				<br/>
				<label>
					<input type="file"
						ref={input => {
							this.fileInput = input;
						}}
					/>
				</label>
				<br/><br/>
				<button type="submit">Submit</button>
			</form>
		);
	}
}