document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'https://mec-gw.ops.dice.se/jsonrpc/prod_default/prod_default/pc/api';
    const requestData = {
        jsonrpc: '2.0',
        method: 'Pamplona.getPlayerTag',
        params: {
            personaId: ''
        },
        id: '5dbcfaff-75ff-4860-a5dc-fe8ea06d5728'
    };
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    };

    const statusTextElement = document.querySelector('.statustext');

    // Add a delay of 2 seconds
    setTimeout(() =>
    {
        makeRequest();
        console.log("Making initial request");
    }, 2000);

    // Make call every 2 minutes
    setInterval(() =>
    {
        console.log("Making a new request");
        setStatusTextAndColor('Checking...');

        setTimeout(() =>
        {
            makeRequest();
        }, 2000);
    }, 120000);

    function makeRequest() {
        fetch(apiUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setStatusTextAndColor('Active');
            })
            .catch(error => {
                console.error('Error:', error);
                setStatusTextAndColor('Inactive');
            });
    }

    function setStatusTextAndColor(status) {
        statusTextElement.textContent = `${status}`;
        if (status === 'Active') {
            statusTextElement.style.color = 'green';
        } else if(status === 'Checking...') {
            statusTextElement.style.color = 'white';
        } else {
            statusTextElement.style.color = 'red';
        }
    }
});
