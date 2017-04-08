(function() {
    [].slice.call(document.querySelectorAll('.grid--effect-hamal > .grid__item')).forEach(function(stackEl) {
        new HamalFx(stackEl);
    });


})();

$('.like').bind('click',function(ev){

	ev.preventDefault();

	var like=0;

	var project_id = $(this).data('id');
	console.log(project_id)
	if(!this.classList.contains('active-like')){

			like = 1;

	}




	this.classList.toggle('active-like');
	return false;

})
	