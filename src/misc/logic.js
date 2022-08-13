import config from "./config";
// Check if email has correct format
const emailPatern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export const emailLogic = (e, setCurrentEmail, setValidEmail, refName) => {
  if (e.which) {
    if (e.which === 9 || e.which === 32) {
      e.preventDefault();
      return false;
    } else return true;
  }
  const v = e.target.value;
  const last = v.charAt(v.length - 1);
  if (!/[a-zA-Z0-9_]/.test(last)) {
    if (last === ".") {
      if (v.length === 1) return setCurrentEmail(e.target.value.slice(0, -1));
      else if (v.charAt(v.length - 2) === "@")
        setCurrentEmail(e.target.value.slice(0, -1));
      else setCurrentEmail(e.target.value);
    } else if (last === "@") {
      if (v.length === 1) return setCurrentEmail("");
      else {
        const l = v.split("@").length;
        if (l > 2) return setCurrentEmail(e.target.value.slice(0, -1));
        else setCurrentEmail(e.target.value);
      }
    } else setCurrentEmail(e.target.value.slice(0, -1));
  } else {
    setCurrentEmail(e.target.value);
    if (emailPatern.test(e.target.value)) {
      if (
        refName.current.value &&
        refName.current.value.length >= config.name.minLength &&
        refName.current.value.length <= config.name.maxLength
      )
        setValidEmail(true);
    } else {
      setValidEmail((prev) => {
        if (prev) return false;
        return prev;
      });
    }
  }
};
export const nameLogic = (
  e,
  validName,
  setValidName,
  setValidEmail,
  refName,
  refEmail
) => {
  const v = e.target.value;
  if (e.which) {
    if (e.which === 32 && refName.current.value.length < 1) {
      e.preventDefault();
      return false;
    } else return true;
  }
  const last = v.charAt(v.length - 1);
  if (!/[a-zA-ZÖöÅåÄä]/.test(last)) {
    if (last !== " ") refName.current.value = e.target.value.slice(0, -1);
  }
  if (
    !refName.current.value ||
    refName.current.value.length < config.name.minLength ||
    refName.current.value.length > config.name.maxLength
  ) {
    if (validName) {
      setValidName(false);
    }
  } else if (!validName) {
    if (
      refName.current.value.length >= config.name.minLength &&
      refName.current.value.length < config.name.maxLength
    ) {
      setValidName(true);
      if (emailPatern.test(refEmail.current.value)) setValidEmail(true);
    }
  }
};
