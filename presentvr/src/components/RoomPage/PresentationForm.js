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

		if(this.fileInput.files.length && this.fileInput.files.length > 0 && this.props.presentation) {
			var data = new FormData();

			for(var index in this.fileInput.files) {
				if(index < this.fileInput.files.length)
					data.append('files', this.fileInput.files[index]);
			}

			const session = this.props.session;

		    fetch("http://104.131.9.190:3000/p/" + this.props.presentation.id + "/slides?userId=" + this.props.user.id, {
				method: 'POST',
				body: data,
		    }).then((response) => {
		 		console.log(response.body);
		    }).catch(error => {
		    	console.log(error);
		    	alert("Sorry, there was an error uploading your presentation. Please try again later.");
		    });
		} else {
			console.log("Error getting files");
			alert("There was an error uploading your presentation. Please check the format of the chosen file.");
		}
	}

	render() {
		console.log("User: ", this.props.user);

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