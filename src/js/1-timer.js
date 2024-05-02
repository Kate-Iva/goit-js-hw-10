import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const convertMs = ms => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  };

  const startButton = document.querySelector('button[data-start]');
const datePickerField = document.querySelector('input#datetime-picker');
const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');

let selectedDate;

const updateTimerDisplay = ({ days, hours, minutes, seconds }) => {
  daysField.textContent = String(days).padStart(2, '0');
  hoursField.textContent = String(hours).padStart(2, '0');
  minutesField.textContent = String(minutes).padStart(2, '0');
  secondsField.textContent = String(seconds).padStart(2, '0');
};

const startTimer = () => {
  const intervalId = setInterval(() => {
    const date = new Date();
    let difTime = selectedDate - date.getTime();
    const { days, hours, minutes, seconds } = convertMs(difTime);

    updateTimerDisplay({ days, hours, minutes, seconds });

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(intervalId);
    }
  }, 1000);
};

startButton.addEventListener('click', () => {
  startTimer();
  startButton.disabled = true;
  datePickerField.disabled = true;
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    let difDate = selectedDate - new Date().getTime();
    if (difDate <= 0) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        color: '#FF2E2E',
        messageColor: '#ffffff',
        backgroundColor: '#FF2E2E',
        timeout: 5000,
        close: false,
      });
      return;
    }

    startButton.disabled = false;
  },
};

flatpickr('input#datetime-picker', options);