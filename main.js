// Contact class for the contacts
class Contact {
    constructor(firstName, lastName, phoneNo, location) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNo = phoneNo;
        this.location = location;
    }
}



//Operations class handles the basic operations like add contact ...
class Operations {

    static getContact() {
        const contacts = Storage.store();
        contacts.forEach((cont) => Operations.displayContacts(cont));
    }

    static displayContacts(cont) {
        const contactList = document.querySelector('.contact-list');
        const contactRow = document.createElement('details');
        contactRow.innerHTML = `
        <summary><img src="pics.svg"> <span>${cont.firstName} ${cont.lastName}</span></summary>
        <p class="telNo">${cont.phoneNo}</p>
        <p>${cont.location}</p>
        <button id="delete">Delete</button>
        </details>
        `;
        contactRow.className = 'contact-row'
        contactList.appendChild(contactRow);

    }

    static createAlert(message, alertClass) {
        const container = document.getElementById('contact-form');
        const div = document.createElement('div');

        div.className = `${alertClass} alert`;
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div, document.querySelector('.formgroup'));

        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 2500)

    }


    static clearFields() {
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('phoneNo').value = '';
        document.getElementById('location').value = '';

    }
}

class Storage {
    static store() {
        let storeContacts;
        if (localStorage.getItem('storeContacts') === null) {
            storeContacts = [];
        } else {
            storeContacts = JSON.parse(localStorage.getItem('storeContacts'));
        }
        return storeContacts;
    }

    static addToStore(contact) {
        const addContacts = Storage.store();

        addContacts.push(contact);

        localStorage.setItem('storeContacts', JSON.stringify(addContacts));
    }

    static removeContact(telno) {
        const deleteContacts = Storage.store();

        deleteContacts.forEach((contact, index) => {
            if (`${contact.phoneNo}` === telno) {
                deleteContacts.splice(index, 1);
            }
        });
        localStorage.setItem('storeContacts', JSON.stringify(deleteContacts));
    }
}




// Event Display contacts
document.addEventListener('DOMContentLoaded', Operations.getContact)

//Event Add a new contact
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    //Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const telNo = document.getElementById('phoneNo').value;
    const location = document.getElementById('location').value;

    //Form validation
    if (firstName === '' || lastName === '' || telNo === '' || location === '') {
        Operations.createAlert('Please completely fill all fields', 'danger');
        Operations.clearFields();
        console.log('listening')
    } else if (firstName.length > 15 || lastName.length > 15) {
        Operations.createAlert('Maximum character length exceeded', 'danger');
        Operations.clearFields();
    } else if (isNaN(telNo)) {
        Operations.createAlert('Please enter a valid number', 'danger');
        Operations.clearFields();
    }
    else {
        //Instatiate a new contact
        const contact = new Contact(firstName, lastName, telNo, location)
        // add contact
        Storage.addToStore(contact)
        Operations.displayContacts(contact)
        Operations.createAlert('You sucessfully added a new contact', 'success');
        Operations.clearFields();
        // clear fields
    }
})

document.querySelector('.contact-list').addEventListener('click', (e) => {
    if (e.target.textContent === 'Delete') {
        const parent = e.target.parentElement
        const telNo = parent.querySelector('.telNo')
        if (confirm('Are you sure')) {
            Storage.removeContact(telNo.textContent)
            parent.remove()
        }
    }

})

