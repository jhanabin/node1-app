console.log('Hello Log');

const searchForm = document.querySelector('form');
const loc = document.querySelector('input');

searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const address = loc.value;
	fetch('http://localhost:3000/weather?address=' + address).then((response) => {
		response.json().then((data) => {
			console.log(data);
		});
	});

	//console.log(loc.value);
});
