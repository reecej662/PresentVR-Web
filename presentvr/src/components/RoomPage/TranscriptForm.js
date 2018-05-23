import React, { Component } from 'react';

export class TranscriptForm extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.nativeEvent.stopImmediatePropagation();
		event.preventDefault();

		if(this.fileInput.files[0]) {
			console.log(this.fileInput.files[0]);

			var data = new FormData();
			data.set('file', this.fileInput.files[0]);
			data.set('filename', this.fileInput.files[0].name);

			const session = this.props.session;

		    fetch("http://104.131.9.190:3000/p/" + this.props.presentation.id + "/slides", {
				method: 'POST',
				body: data
		    }).then((response) => {
		 		console.log(response);
		    }).catch(error => {
		    	console.log(error);
		    	alert("Sorry, there was an error uploading your transcript. Please try again later.");
		    });
		} else {
			console.log("Error getting file");
			alert("There was an error uploading your transcript. Please check the format of the chosen file.");
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