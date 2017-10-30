function defer(method) {
    if (window.jQuery) {
        method();
    } else {
        setTimeout(function() { defer(method) }, 50);
    }
}

defer(()=> {
	$(`#scrapeSiteForm`).submit(e => {
        console.log(`------\nattempting to scrape site\n-----`);
        e.preventDefault(); // Stops browser from navigating away from page
		const id = $(`#scrapeTarget :selected`).val();
		// console.log(`selected id:`, id);
		$.get(
			`/scrape/${id}`,
			data => {
				console.log(`page scraped. more info:`, data);
				window.location.reload(true);
			}
		);
	});
});
