import iziToast from "izitoast";


// const form = document.querySelector('.form')
// form.addEventListener('submit', handlerForm)

// function handlerForm(e) {
//   e.preventDefault();

//   const formDelay = document.querySelector('[name="delay"]');
//   const formState = document.querySelector('[name = "state"]');

//   const delay = parseInt(formDelay.value);
//   const state = formState.value;

//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (state === "fulfilled") {
//         resolve(delay);
//       } else if (state === "rejected") { reject(delay) };
//     }, delay);
//   });

//   promise
//     .then((value) => {
//       iziToast.show({
//         backgroundColor: '#59a10d',
//         messageColor: '#fff',
//         messageSize: '16px',
//         position: 'topRight',
//         message: `✅ Fulfilled promise in ${value} ms`
//       });
//     })
//     .catch((value) => {
//       iziToast.show({
//         message: `❌ Rejected promise in ${value} ms`
//       });
//     });
// }

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay)
  })
}

function handlePromise(delay, state) {
  createPromise(delay, state)
    .then((result) => {
      iziToast.success({
        backgroundColor: '#59a10d',
        messageColor: '#fff',
        messageSize: '16px',
        position: 'topRight',
        message: `✅ Fulfilled promise in ${result} ms`
      });
    })
    .catch((error) => {
      iziToast.error({
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        messageSize: '16px',
        position: 'topRight',
        message: `❌ Rejected promise in ${error} ms`
      });

    })
}

const form = document.querySelector('.form');
form.addEventListener('submit', handlerForm)
function handlerForm(e) {
  e.preventDefault();
  const delayInp = form.querySelector("input[name='delay']");
  const stateInp = form.querySelector("input[name='state']:checked");
  const delay = parseInt(delayInp.value, 10);
  const state = stateInp.value;
  handlePromise(delay, state);
}