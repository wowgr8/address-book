// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function (id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function (id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(
  firstName,
  lastName,
  phoneNumber,
  email,
  streetAddress,
  country
) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = firstName + " " + lastName;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.streetAddress = streetAddress;
  this.country = country;
}

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function (key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += `<li id="${contact.id}">${contact.firstName} ${contact.lastName}</li>`;
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
  $("#show-contact").show();
  const contact = addressBook.findContact(contactId);

  for (let key in contact) {
    if (
      contact[key] !== "" ||
      contact[key] !== null ||
      contact[key] !== undefined
    ) {
      $("." + key).html(contact[key]);
    } else {
      // need to find a way to remove the parent element ...
    }
  }

  let buttons = $("#buttons");
  buttons.empty();
  buttons.append(
    "<button class='deleteButton' id=" + +contact.id + ">Delete</button>"
  );
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function () {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function () {
  attachContactListeners();
  $("form#new-contact").submit(function (event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = $("input#new-email").val();
    var inputtedStreetAddress = $("input#new-street-address").val();
    var inputtedCountry = $("input#new-country").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    $("input#new-street-address").val("");
    $("input#new-country").val("");
    var newContact = new Contact(
      inputtedFirstName,
      inputtedLastName,
      inputtedPhoneNumber,
      inputtedEmail,
      inputtedStreetAddress,
      inputtedCountry
    );
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});
