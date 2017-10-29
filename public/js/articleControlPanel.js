function getId(jQueryObj) {
	const id = jQueryObj.parent().data(`id`);
	return id;
}

function displayNotes(e) {
	console.log(`------\ndisplayNotes function\nclicking this:`, $(this));
	const id = getId($(this));
	// console.log(`the article id is:`, id);
	$('.darkenWorld').toggle();
	$(`.notesContainerOuter`).toggle();
	$(`.content`).addClass(`noscroll`);
	$(`.addNewNote`).data(`id`, id );
	$(`.notesContainerInner`).empty();
	$(`.addNewNote`).data(`id`, id)
	$.get(`/notes/article/${id}`, data => {
		// console.log(data);
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
	});
};

function deleteArticle(e) {
	console.log(`------\ndeleteArticle function\nclicking this:`, $(this));
	// console.log(getId( $(this) ));
	const id = getId($(this));
	$.get(
		`/article/deleteOne/${id}`,
		data => {
			// console.log(`Article deleted. More info:`, data)
			if (data) location.reload(true);
		}
	);
};

defer(()=> {
	$(`.articleControls .displayNotes`).on(`click`, displayNotes);
	$(`.articleControls .deleteArticle`).on(`click`, deleteArticle);
});
