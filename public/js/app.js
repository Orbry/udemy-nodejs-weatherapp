(() => {
    const form = document.forms[0];
    const input = form.firstElementChild;
    const msgTitle = document.querySelector('#msgTitle');
    const msgBody = document.querySelector('#msgBody');

    form.addEventListener('submit', e => {
        e.preventDefault();
        msgTitle.textContent = 'Loading...';
        msgBody.textContent = '';

        fetch(`/weather?address=${input.value}`)
            .then(res => res.json())
            .then(({ error, location, forecast } = { error: 'Error parsing json data'}) => {
                if (error) {
                    return msgTitle.textContent = error;
                }

                msgTitle.textContent = location;
                msgBody.textContent = forecast;
            });
    });
})();
