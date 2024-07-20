import flatpickr from "flatpickr";
import iziToast from "izitoast";

const datetimePicker = document.getElementById('datetime-picker');

let userSelectedDate;
const currentDate = new Date();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= currentDate) {
      iziToast.show({
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        messageSize: '16px',
        position: 'topRight',
        message: 'Please choose a date in the future'
      });
      document.getElementById('startButton').disabled = true;
    } else {
      document.getElementById('startButton').disabled = false;
    }
    console.log(userSelectedDate);
  },
};

flatpickr(datetimePicker, options);

function calculateTimeDifference(endDate) {
  const currentTime = new Date().getTime();
  const endTime = new Date(endDate).getTime();
  return endTime - currentTime;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

let timeDifference;

const clickStart = document.getElementById('startButton')
clickStart.disabled = true;
clickStart.addEventListener('click', handlerStart);
function handlerStart() {
  const timeInterval = setInterval(() => {
    const endDate = datetimePicker.value;
    timeDifference = calculateTimeDifference(endDate);

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    document.getElementById('days').textContent = addLeadingZero(days);
    document.getElementById('hours').textContent = addLeadingZero(hours);
    document.getElementById('minutes').textContent = addLeadingZero(minutes);
    document.getElementById('seconds').textContent = addLeadingZero(seconds);

    if (timeDifference <= 1000) {
      clearInterval(timeInterval);
      datetimePicker.disabled = false;
    }
  }, 1000);

  datetimePicker.disabled = true;
  clickStart.disabled = true;
}