import { useState, useEffect } from 'react'
import { getContacts, createContact, deleteContact, updateContact, getContact } from "./contacts";

export const useContact = () => {
  const [contacts, setContacts] = useState([]);

  const dlContacts = async()=>{
    const contacts = await getContacts();
    console.log("set remote copy");
    setContacts(contacts);
  }

  useEffect(()=>{
    console.log("use effect set remote copy");
    dlContacts();
  }, []);

  const create = async ()=>{
    const contact = await createContact();
    //local copy
    console.log("set local copy");
    setContacts([contact, ...contacts]);
    //reomte copy
    dlContacts();
    return contact;
  }

  const remove = async (id)=>{
    const contact = await deleteContact(id);
    console.log("set local copy");
    setContacts(contacts.filter((c)=>c.id!=id));
    //reomte copy
    dlContacts();
  }

  const update = async (id, updates)=>{
    await updateContact(id, updates);
    //reomte copy
    dlContacts();
  }

  return { contacts, create, remove, update, getContact };
};
