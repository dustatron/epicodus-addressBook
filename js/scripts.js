$(document).ready(function() {
	//Business Logic for AddressBook --------
	function AddressBook() {
		this.contacts = [];
		this.currentId = 0;
	}

	AddressBook.prototype.addContact = function(contact) {
		contact.id = this.assignId();
		this.contacts.push(contact);
	};

	AddressBook.prototype.assignId = function() {
		this.currentId += 1;
		return this.currentId;
	};

	AddressBook.prototype.findContact = function(id) {
		for (let i = 0; i < this.contacts.length; i++) {
			if (this.contacts[i]) {
				if (this.contacts[i].id == id) {
					return this.contacts[i];
				}
			}
		}
		return false;
	};

	AddressBook.prototype.updateContact = function(id, object) {
		for (let i = 0; i < this.contacts.length; i++) {
			if (this.contacts[i].id == id) {
				this.contacts[i].firstName = object.firstName;
				this.contacts[i].lastName = object.lastName;
				this.contacts[i].phoneNumber = object.phoneNumber;
			}
		}
	};

	AddressBook.prototype.deleteContact = function(id) {
		for (let i = 0; i < this.contacts.length; i++) {
			if (this.contacts[i]) {
				if (this.contacts[i].id == id) {
					delete this.contacts[i];
					return true;
				}
			}
		}
		return false;
	};

	//Business Logic for Contacts -----------
	function Contact(firstName, lastName, phoneNumber, address, workEmail, personalEmail) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.email = {
			work: workEmail,
			personal: personalEmail
		};
	}

	Contact.prototype.fullName = function() {
		return this.firstName + ' ' + this.lastName;
	};

	var addressBook = new AddressBook();

	function displayContactDetails(addressBooToDisplay) {
		var contactsList = $('ul#contacts');
		var htmlForContactInfo = '';
		addressBooToDisplay.contacts.forEach(function(contact) {
			htmlForContactInfo += '<li id=' + contact.id + '>' + contact.firstName + ' ' + contact.lastName + '</li>';
		});
		contactsList.html(htmlForContactInfo);
	}

	function showContact(contactId) {
		var contact = addressBook.findContact(contactId);
		$('#show-contact').show();

		
		$('.first-name').html(contact.firstName);
		$('.last-name').html(contact.lastName);
		$('.phone-number').html(contact.phoneNumber);
		$('.address').html(contact.address);
		$('.email-personal').parent().show();
		$('.email-work').parent().show();

		if (contact.email.work) {
			$('.email-work').html(contact.email.work);
		} else {
			$('.email-work').parent().hide();
		}
		if (contact.email.personal) {
			$('.email-personal').html(contact.email.personal);
		} else {
			$('.email-personal').parent().hide();
		}
		var buttons = $('#buttons');
		buttons.empty();
		// buttons.append("<button class='deleteButton id=" + contact.id + '>Delete</button>');
		buttons.append("<button class='deleteButton' id='" + contact.id + "'>Delete</button>");
	}

	function attachContactListeners() {
		$('ul#contacts').on('click', 'li', function() {
			showContact(this.id);
		});
	}

	$('#buttons').on('click', '.deleteButton', function() {
		addressBook.deleteContact(this.id);
		$('#show-contact').hide();
		displayContactDetails(addressBook);
	});

	$(document).ready(function() {
		$('form#new-contact').submit(function(event) {
			attachContactListeners();
			event.preventDefault();
			var inputtedFirstName = $('input#new-first-name').val();
			var inputtedLastName = $('input#new-last-name').val();
			var inputtedPhoneNumber = $('input#new-phone-number').val();
			var inputterAddress = $('input#new-address').val();
			var inputterEmailWork = $('input#new-email-work').val();
			var inputterEmailPersonal = $('input#new-email-personal').val();

			// Empty form fields
			// $('input#new-first-name').val('');
			// $('input#new-last-name').val('');
			// $('input#new-phone-number').val('');
			// $('input#new-emailr').val('');
			// $('input#new-address').val('');

			var newContact = new Contact(
				inputtedFirstName,
				inputtedLastName,
				inputtedPhoneNumber,
				inputterAddress,
				inputterEmailWork,
				inputterEmailPersonal
			);
			addressBook.addContact(newContact);
			displayContactDetails(addressBook);
			console.log(addressBook.contacts);
		});
	});
});
