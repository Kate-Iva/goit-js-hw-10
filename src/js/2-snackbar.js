import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';



const promiseForm = document.querySelector('.form');
const delay = document.querySelector('input[name="delay"]');
const fulfilledRadio = document.querySelector('input[value="fulfilled"]');

const toastSettings = {
  position: 'topRight',
  messageColor: '#ffffff',
  timeout: 5000,
  close: false,
  radius: 15,
};

const promiseDelay = (delay, promiseFunc) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      promiseFunc === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });
};

const handlePromise = (delay, promiseFunc) => {
  promiseDelay(delay, promiseFunc)
    .then(delay => {
      iziToast.show({
        ...toastSettings,
        message: `✅ Fulfilled promise in ${delay}ms`,
        backgroundColor: 'green',
      });
    })
    .catch(delay => {
      iziToast.show({
        ...toastSettings,
        message: `❌ Rejected promise in ${delay}ms`,
        backgroundColor: '#FF2E2E',
      });
    });
};

const handleSubmit = event => {
  event.preventDefault();

  fulfilledRadio.checked
    ? handlePromise(Number(delay.value), 'fulfilled')
    : handlePromise(Number(delay.value), 'rejected');

  event.target.reset();
};

promiseForm.addEventListener('submit', handleSubmit);