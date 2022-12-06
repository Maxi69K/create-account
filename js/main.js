// Create a Form using only the DOM
const form = document.createElement('form');
form.setAttribute('action', '#')
form.id = 'myForm';
form.style.maxWidth = '360px';

function createLabel(forLab, textLab) {
    const label = `<label for="${forLab}">${textLab}</label>`;
    return label;
}

function createInput(type, placeholder, id) {
    const input = `<input type="${type}" placeholder="${placeholder}" id="${id}">`;
    return input;
}

form.innerHTML = `
<h2>Add User</h2>
<div>
${createLabel('first-name', 'First Name:')} ${createInput('text', 'John', 'first-name')}
</div>
<div>
${createLabel('last-name', 'Last Name:')} ${createInput('text', 'Doe', 'last-name')}
</div>
<div>
${createLabel('user-birth', 'Birth day:')} ${createInput('date', null, 'user-birth')}
</div>
<div>
${createLabel('user-email', 'E-mail:')} ${createInput('email', 'johndoe@gmail.com', 'user-email')}
</div>
<div>
${createLabel('user-pass', 'Password:')} ${createInput('password', 'enter your password', 'user-pass')}
</div>
<button class='btn' id='submitBtn' type='submit'>Submit</button>
`;

document.body.appendChild(form);

document.querySelector('form').querySelectorAll('div').forEach(div => div.className = 'form-group');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    document.body.style.display = 'grid';
    document.body.style.gridTemplateColumns = '1fr 1fr';

    // Get input values
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;

    function getFullName() {
        const fullName = `${firstName} ${lastName}`;
        return fullName;
    }
    const userBirth = document.getElementById('user-birth').value;

    function calculateAge(userBirth) {
        let birthday = new Date(userBirth);
        let ageDif = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDif);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-pass').value;

    validation();

    function validation() {
        if (firstName === '' || lastName === '' || userBirth === '' || email === '' || password === '') {
            alert('All field must be completed');
            return;
        } else {
            createUser();
            const inputs = document.querySelectorAll('input');
            inputs.forEach(function (inputField) {
                inputField.value = '';
            });
        }
    }

    function createUser() {
        const ul = document.createElement('ul');
        ul.id = 'user-details';
        ul.className = 'animate-in';
        ul.innerHTML = `
        <h4>${getFullName()}</h4>
        <div style='width:150px'>
        <img id='user-image' src="img/avatar.svg" alt="User Image" style='max-width:100%; border-radius:25px'>
        </div>
        <li>First Name: <span>${firstName}</span></li>
        <li>Last Name: <span>${lastName}</span></li>
        <li>Birth Day: <span>${userBirth}</span></li>
        <li>Age: <span>${calculateAge(userBirth)}</span></li>
        <li>E-mail: <span>${email}</span></li>
        `;
        document.body.appendChild(ul);
    }
});