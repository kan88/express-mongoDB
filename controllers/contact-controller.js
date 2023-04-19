const Contacts = require("../models/contacts");
const createPath = require("../helpers/create-path");
const handleError = require("../helpers/handle-error");

const getContacts = (req, res) => {
  Contacts.find()
    .then((contacts) => res.render(createPath("contacts"), { contacts }))
    .catch((err) => handleError(res, err));
};

module.exports = {
  getContacts,
};
