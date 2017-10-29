function hideNotes(e) {
	// console.log(`------\nhideNotes function\nclicking this:`, $(this));
	$('.darkenWorld').toggle();
	$(`.notesContainerOuter`).toggle();
	$(`.content`).removeClass(`noscroll`);
}

function addNewNote(e) {
	e.preventDefault();
	// console.log(`------\naddNewNote function\nclicking this:`, $(this));
	const id = $(this).data(`id`);
	const note = {
		title: $(`#title`).val(),
		author: $(`#author`).val(),
		content: $(`#content`).val()
	};
	$.post(`/note/submit/${id}`, note, (res) => {
		console.log(res);
		$.get(`/notes/article/${id}`, data => {
			$(`.notesContainerInner`).empty();
			data.notes.forEach((value, i) => {
				$(`.notesContainerInner`).append(`<div class='singleNoteContainer'>`
					+ `<div class="noteBody"><h2>${value.title}</h2>`
					+ `<h3>by ${value.author}</h3><p>${value.content}</p>`
					+ `</div><div class="singleNoteControls" data-noteId="${value._id}" data-articleId="${id}">`
					+ `<button class="deleteNote">`
					+ `<i class="fa fa-trash" aria-hidden="true"></i></button>`
					+ `</div></div>`
				);
			});
			$(`form.addNewNote input`).val(``);
			$(`form.addNewNote textarea`).val(``);
		});
	});
};

function deleteNote(e) {
	console.log(`------\ndeleteNote function\nclicking this:`, $(this));
	const articleId = $(this).parent().data(`articleid`);
	const noteId = $(this).parent().data(`noteid`);
	console.log();
	$.get(
		`/note/deleteOne/${noteId}/${articleId}`,
		data => {
			// if (data) location.reload(true);
			console.log(`deleted`);
		}
	);
};

defer(()=> {
	$(`#closeNotes`).on(`click`, hideNotes);
	$(`.addNewNote`).on(`submit`, addNewNote);
	$(`.notesContainerOuter`).on(`click`, `.deleteNote`, deleteNote);
});
