// function handlers
$(document).ready(() => {
  // listen for login checkbox click
  $('#loginPasswordCheck').click((e) => {
    e.preventDefault();
    changePassType('loginInputPassword1', 'loginPasswordCheck');
  });

  console.log(document.cookie);
});
