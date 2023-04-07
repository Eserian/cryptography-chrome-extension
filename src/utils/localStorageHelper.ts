export const saveStateToLocalStorage = (state: { initialized: boolean; loggedIn: boolean }) => {
  localStorage.setItem('extension_state', JSON.stringify(state));
}

export const getStateFromLocalStorage = () => {
  const state = localStorage.getItem('extension_state');
  return state ? JSON.parse(state) : null;
}
