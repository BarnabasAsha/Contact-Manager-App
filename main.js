// Contact class for the contacts
class Contact {
    constructor (firstName, lastName, phoneNo, location) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNo = phoneNo;
        this.location = location;
    }
}



//Operations class handles the basic operations like add contact ...
class Operations {
  
    static displayContactList() {
        
        const contacts = Storage.getContact();

        contacts.forEach((cont) => Operations.addContacts(cont));
        
    }

    static displayContact(contact) {
        const contacts = Storage.getContact();
        contacts.forEach((cont) => {
            if(cont.firstName == contact) {
                const contactContainer = document.querySelector('.display-contact');
                const contactLists = document.querySelector('.contact-row')
                const picture = document.createElement('img');
                picture.href = 'images\pic.jpg'
                picture.className = 'contact-picture';
                contactContainer.appendChild(picture);
                const contactInfo = document.createElement('div')
                contactInfo.innerHTML = `
                <p>${cont.firstName} ${cont.lastName}</p>
                <p>${cont.phoneNo}</p>
                <p>${cont.location}</p>
                `
                contactContainer.appendChild(contactInfo)
                contactContainer.style.display = 'block';
                contactLists.style.display = 'none';
            }
        })

    }

    static addContacts(cont) {
        const contactList = document.querySelector('.contact-list');
        const contactRow = document.createElement('div');
        contactRow.innerHTML = `
        <p><span>${cont.firstName}</span> ${cont.lastName} </p>
        `;
        contactRow.className = 'contact-row'
        contactList.appendChild(contactRow); 
                
    }

    static deleteContact(el) {
        if(el.classList.contains('delete')){
            el.parentElement.remove();
        }
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
    static getContact() {
        let storeContacts;
        if(localStorage.getItem('storeContacts') === null) {
            storeContacts = [];
        } else {
            storeContacts = JSON.parse(localStorage.getItem('storeContacts'));
        }
        return storeContacts;
    }

    static addContactToStorage(contact) {
        const addContacts = Storage.getContact();
        
        addContacts.push(contact);

        localStorage.setItem('storeContacts', JSON.stringify(addContacts));
    }

    static removeContact(name) {
        const deleteContacts = Storage.getContact();

        deleteContacts.forEach((contact, index) => {
            if(`${contact.firstName} ${contact.lastName}` == name){
                deleteContacts.splice(index, 1);
            }
        });
        localStorage.setItem('storeContacts', JSON.stringify(deleteContacts));
    }
}




//Event Display contacts
document.addEventListener('DOMContentLoaded', Operations.displayContactList())

//Event Add a new contact
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    //Get form values

    const firstName = document.getElementById('firstName').value;

    const lastName = document.getElementById('lastName').value;
    
    const telNo = document.getElementById('phoneNo').value;

    const location = document.getElementById('location').value;

    //Form validation
    if(firstName === '' || lastName === '' || telNo === '' || location === ''){
        Operations.createAlert('Please completely fill all fields', 'danger');
        Operations.clearFields();
        console.log('listening')

    }else if (firstName.length > 15 || lastName.length > 15) {
        Operations.createAlert('Maximum character length exceeded', 'danger');
        Operations.clearFields();
    }else if (parseFloat(telNo) == NaN){
        Operations.createAlert('Please enter a valid number', 'danger');
        Operations.clearFields();
    }
    else {
        //Instatiate a new contact
    const contact = new Contact(firstName, lastName, telNo, location)
    // add contact
    Operations.addContacts(contact);
    Storage.addContactToStorage(contact)
    Operations.createAlert('You sucessfully added a new contact', 'success');

    Operations.clearFields();

    
    // clear fields
    }


})

//Event display contact info
let contactRows = document.querySelectorAll('.contact-row');
contactRows.forEach((contact) => {
    contact.addEventListener('click', (e) => {
        
        const parent = e.target.firstElementChild;
        Operations.displayContact(parent.firstElementChild.textContent)
    
    })
})



// contactRows.forEach((contactRow) => {
//     contactRow.addEventListener('click', e => {
//         Operations.deleteContact(e.target);
//         Storage.removeContact(e.target.previousElementSibling.textContent);
//         console.log(e.target.previousElementSibling.textContent)
//         Operations.createAlert('You sucessfully deleted a contact', 'success');
    
        
//     })
// })

